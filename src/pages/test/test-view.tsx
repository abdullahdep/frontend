import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';

import { useContentStore } from '../../store/content-store';
import { useAuthStore } from '../../store/auth-store';
import { Button } from '../../components/ui/button';
import MCQQuestion from '../../components/test/mcq-question';
import ShortQuestion from '../../components/test/short-question';
import TestTimer from '../../components/test/test-timer';
import { UserAnswer } from '../../types';
import { calculateScore } from '../../lib/utils';

const TestView = () => {
  const { topicId, testId } = useParams<{ topicId: string; testId: string }>();
  const { tests } = useContentStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  
  const test = testId && tests.find(t => t.id === testId);
  
  useEffect(() => {
    // Initialize empty answers for each question
    if (test) {
      const initialAnswers: UserAnswer[] = [
        ...test.mcqQuestions.map(q => ({ questionId: q.id })),
        ...test.shortQuestions.map(q => ({ questionId: q.id })),
      ];
      setUserAnswers(initialAnswers);
    }
  }, [test]);
  
  if (!test) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Test not found</h1>
        <p className="text-muted-foreground mb-6">
          The test you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    );
  }
  
  // Check if user can access premium content
  if (test.isPremium && !user?.isPremium) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Premium Content</h1>
        <p className="text-muted-foreground mb-6">
          This test is available only for premium users. Please upgrade to access this content.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate(-1)} variant="outline">Go back</Button>
          <Button onClick={() => navigate('/premium')}>Upgrade to Premium</Button>
        </div>
      </div>
    );
  }
  
  const handleMCQAnswer = (questionId: string, optionId: string, isCorrect: boolean) => {
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, selectedOptionId: optionId, isCorrect } 
          : answer
      )
    );
  };
  
  const handleShortAnswer = (questionId: string, uploadedImageUrl?: string) => {
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, uploadedImageUrl } 
          : answer
      )
    );
  };
  
  const handleTimeUp = () => {
    setShowConfirmation(true);
  };
  
  const handleSubmitTest = () => {
    setIsSubmitting(true);
    
    // Calculate results
    const totalMCQs = test.mcqQuestions.length;
    const correctMCQs = userAnswers.filter(a => a.isCorrect).length;
    const calculatedScore = calculateScore(correctMCQs, totalMCQs);
    
    // In a real app, we would submit this to a backend
    setTimeout(() => {
      setScore(calculatedScore);
      setIsFinished(true);
      setIsSubmitting(false);
    }, 1500);
  };
  
  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Test Completed</h1>
        <p className="text-xl mb-6">
          Your score: <span className="font-semibold">{score}%</span>
        </p>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for completing the test. You can review your answers and see explanations below.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate(`/subjects/${test.subjectId}/chapters/${test.chapterId}/topics/${test.topicId}`)}
              variant="outline"
            >
              Back to Topic
            </Button>
            <Button 
              onClick={() => navigate(`/test/${test.topicId}/${test.id}/review`)}
            >
              Review Answers
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-12">
      <TestTimer duration={test.duration} onTimeUp={handleTimeUp} />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{test.title}</h1>
          {test.description && (
            <p className="text-muted-foreground">{test.description}</p>
          )}
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Multiple Choice Questions</h2>
          {test.mcqQuestions.map((question, index) => (
            <MCQQuestion
              key={question.id}
              question={question}
              number={index + 1}
              onAnswerSelected={handleMCQAnswer}
            />
          ))}
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Short Questions</h2>
          {test.shortQuestions.map((question, index) => (
            <ShortQuestion
              key={question.id}
              question={question}
              number={index + 1}
              onAnswerSubmitted={handleShortAnswer}
            />
          ))}
        </div>
        
        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              {userAnswers.filter(a => a.selectedOptionId || a.uploadedImageUrl).length} of {userAnswers.length} questions answered
            </p>
          </div>
          <Button 
            onClick={() => setShowConfirmation(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </Button>
        </div>
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card max-w-md w-full rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">Submit Test?</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to submit your test? You won't be able to make any changes after submission.
            </p>
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitTest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestView;