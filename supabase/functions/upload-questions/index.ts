import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import mammoth from 'npm:mammoth@1.6.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin role
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (authError || !user || user.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const topicId = formData.get('topicId') as string;
    const questionType = formData.get('questionType') as 'mcq' | 'short';

    if (!file || !topicId || !questionType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Extract text from Word document
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    const text = result.value;

    // Process the text based on question type
    let questions = [];
    if (questionType === 'mcq') {
      questions = processMCQs(text);
    } else {
      questions = processShortQuestions(text);
    }

    // Insert questions into database
    const { error: insertError } = await supabase
      .from(questionType === 'mcq' ? 'mcq_questions' : 'short_questions')
      .insert(questions.map(q => ({ ...q, topic_id: topicId })));

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, count: questions.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to process MCQs from text
function processMCQs(text: string) {
  const questions = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  let currentQuestion = null;
  let options = [];
  
  for (const line of lines) {
    if (line.startsWith('Q.') || line.startsWith('Question:')) {
      if (currentQuestion) {
        questions.push({
          question_text: currentQuestion,
          options: JSON.stringify(options),
          correct_option: options.find(o => o.isCorrect)?.text || '',
        });
      }
      currentQuestion = line.replace(/^Q\.|Question:/, '').trim();
      options = [];
    } else if (line.match(/^[A-D]\)/)) {
      const isCorrect = line.includes('(correct)');
      options.push({
        text: line.replace(/^[A-D]\)/, '').replace('(correct)', '').trim(),
        isCorrect,
      });
    } else if (line.startsWith('Explanation:')) {
      const explanation = line.replace('Explanation:', '').trim();
      if (currentQuestion) {
        questions[questions.length - 1].explanation = explanation;
      }
    }
  }

  // Add the last question
  if (currentQuestion) {
    questions.push({
      question_text: currentQuestion,
      options: JSON.stringify(options),
      correct_option: options.find(o => o.isCorrect)?.text || '',
    });
  }

  return questions;
}

// Helper function to process short questions from text
function processShortQuestions(text: string) {
  const questions = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  let currentQuestion = null;
  let currentAnswer = null;
  let currentMarks = 5;
  
  for (const line of lines) {
    if (line.startsWith('Q.') || line.startsWith('Question:')) {
      if (currentQuestion && currentAnswer) {
        questions.push({
          question_text: currentQuestion,
          answer_text: currentAnswer,
          marks: currentMarks,
        });
      }
      currentQuestion = line.replace(/^Q\.|Question:/, '').trim();
      const marksMatch = line.match(/\((\d+)\s*marks?\)/i);
      currentMarks = marksMatch ? parseInt(marksMatch[1]) : 5;
      currentAnswer = null;
    } else if (line.startsWith('Answer:')) {
      currentAnswer = line.replace('Answer:', '').trim();
    } else if (currentAnswer) {
      currentAnswer += '\n' + line.trim();
    }
  }

  // Add the last question
  if (currentQuestion && currentAnswer) {
    questions.push({
      question_text: currentQuestion,
      answer_text: currentAnswer,
      marks: currentMarks,
    });
  }

  return questions;
}