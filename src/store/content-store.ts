import { create } from 'zustand';
import { Chapter, MCQQuestion, ShortQuestion, Test } from '../types';
import { SUBJECTS, generateMockChapters, shuffleArray } from '../lib/utils';

interface ContentState {
  subjects: typeof SUBJECTS;
  chapters: Chapter[];
  tests: Test[];
  activeSubject: string | null;
  activeChapter: string | null;
  activeTopic: string | null;
  setActiveSubject: (subjectId: string | null) => void;
  setActiveChapter: (chapterId: string | null) => void;
  setActiveTopic: (topicId: string | null) => void;
  getChaptersBySubject: (subjectId: string) => Chapter[];
  getTestsByTopic: (topicId: string) => Test[];
  generateMockTest: (topicId: string, isPremium: boolean) => Test;
}

// Mock data for demonstration
const createMockTest = (
  topicId: string, 
  index: number, 
  isPremium = false
): Test => {
  const topic = allChapters.flatMap(ch => ch.topics).find(t => t.id === topicId);
  const chapter = allChapters.find(ch => ch.id === topic?.chapterId);
  
  if (!topic || !chapter) {
    throw new Error('Topic not found');
  }
  
  // Create mock MCQ questions
  const mcqQuestions: MCQQuestion[] = Array.from({ length: 5 }, (_, i) => ({
    id: `mcq-${topicId}-${i}`,
    text: `Sample MCQ question ${i + 1} for ${topic.name}?`,
    options: [
      { id: `mcq-${topicId}-${i}-a`, text: 'Option A', isCorrect: i % 4 === 0 },
      { id: `mcq-${topicId}-${i}-b`, text: 'Option B', isCorrect: i % 4 === 1 },
      { id: `mcq-${topicId}-${i}-c`, text: 'Option C', isCorrect: i % 4 === 2 },
      { id: `mcq-${topicId}-${i}-d`, text: 'Option D', isCorrect: i % 4 === 3 },
    ],
    topicId,
    explanation: 'This is the explanation for the correct answer.'
  }));
  
  // Create mock short questions
  const shortQuestions: ShortQuestion[] = Array.from({ length: 3 }, (_, i) => ({
    id: `short-${topicId}-${i}`,
    text: `Write a short explanation about ${topic.name} concept ${i + 1}.`,
    answer: 'This is a sample answer that would be expected from the student.',
    topicId,
    marks: 5
  }));
  
  return {
    id: `test-${topicId}-${index}`,
    title: `${topic.name} Practice Test ${index + 1}`,
    description: `A practice test covering ${topic.name} from ${chapter.name}.`,
    subjectId: chapter.subjectId,
    chapterId: chapter.id,
    topicId,
    mcqQuestions,
    shortQuestions,
    duration: 1800, // 30 minutes in seconds
    isPremium
  };
};

// Generate mock chapters for all subjects
const allChapters: Chapter[] = SUBJECTS.flatMap(subject => 
  generateMockChapters(subject.id)
);

// Generate mock tests for each topic
const allTests: Test[] = allChapters.flatMap(chapter => 
  chapter.topics.flatMap((topic, i) => [
    createMockTest(topic.id, 1),
    createMockTest(topic.id, 2, true),
  ])
);

export const useContentStore = create<ContentState>((set, get) => ({
  subjects: SUBJECTS,
  chapters: allChapters,
  tests: allTests,
  activeSubject: null,
  activeChapter: null,
  activeTopic: null,
  
  setActiveSubject: (subjectId) => set({ 
    activeSubject: subjectId,
    activeChapter: null,
    activeTopic: null 
  }),
  
  setActiveChapter: (chapterId) => set({ 
    activeChapter: chapterId,
    activeTopic: null 
  }),
  
  setActiveTopic: (topicId) => set({ activeTopic: topicId }),
  
  getChaptersBySubject: (subjectId) => {
    return get().chapters.filter(chapter => chapter.subjectId === subjectId);
  },
  
  getTestsByTopic: (topicId) => {
    return get().tests.filter(test => test.topicId === topicId);
  },
  
  generateMockTest: (topicId, isPremium) => {
    const topic = get().chapters
      .flatMap(ch => ch.topics)
      .find(t => t.id === topicId);
      
    if (!topic) {
      throw new Error('Topic not found');
    }
    
    const chapter = get().chapters.find(ch => ch.id === topic.chapterId);
    if (!chapter) {
      throw new Error('Chapter not found');
    }
    
    const mcqCount = isPremium ? 10 : 5;
    const shortCount = isPremium ? 5 : 2;
    
    // Create random MCQ questions
    const mcqQuestions: MCQQuestion[] = Array.from({ length: mcqCount }, (_, i) => ({
      id: `gen-mcq-${topicId}-${Date.now()}-${i}`,
      text: `Generated MCQ question ${i + 1} for ${topic.name}?`,
      options: shuffleArray([
        { id: `gen-mcq-${topicId}-${Date.now()}-${i}-a`, text: 'First option', isCorrect: true },
        { id: `gen-mcq-${topicId}-${Date.now()}-${i}-b`, text: 'Second option', isCorrect: false },
        { id: `gen-mcq-${topicId}-${Date.now()}-${i}-c`, text: 'Third option', isCorrect: false },
        { id: `gen-mcq-${topicId}-${Date.now()}-${i}-d`, text: 'Fourth option', isCorrect: false },
      ]),
      topicId,
      explanation: isPremium ? 'Detailed explanation for the correct answer.' : undefined
    }));
    
    // Create random short questions
    const shortQuestions: ShortQuestion[] = Array.from({ length: shortCount }, (_, i) => ({
      id: `gen-short-${topicId}-${Date.now()}-${i}`,
      text: `Generated short question ${i + 1} about ${topic.name} concept.`,
      answer: 'This is the expected answer that would be compared with student submissions.',
      topicId,
      marks: 5
    }));
    
    return {
      id: `test-${topicId}-${Date.now()}`,
      title: `${topic.name} Custom Test`,
      description: `A custom test covering ${topic.name} from ${chapter.name}.`,
      subjectId: chapter.subjectId,
      chapterId: chapter.id,
      topicId,
      mcqQuestions,
      shortQuestions,
      duration: isPremium ? 3600 : 1800, // 60 or 30 minutes
      isPremium
    };
  }
}));