export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  chapterId: string;
}

export interface Chapter {
  id: string;
  name: string;
  subjectId: string;
  topics: Topic[];
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MCQQuestion {
  id: string;
  text: string;
  options: MCQOption[];
  topicId: string;
  explanation?: string;
}

export interface ShortQuestion {
  id: string;
  text: string;
  answer: string;
  topicId: string;
  marks: number;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  timeSpent: number; // in seconds
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId?: string;
  uploadedImageUrl?: string;
  isCorrect?: boolean;
  marks?: number;
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  chapterId?: string;
  topicId?: string;
  mcqQuestions: MCQQuestion[];
  shortQuestions: ShortQuestion[];
  duration: number; // in seconds
  isPremium: boolean;
}