import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export const GRADES = [9, 10, 11, 12];

export const SUBJECTS = [
  { id: "english", name: "English" },
  { id: "urdu", name: "Urdu" },
  { id: "islamiat", name: "Islamiat" },
  { id: "math", name: "Math" },
  { id: "computer", name: "Computer" },
  { id: "biology", name: "Biology" },
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "civics", name: "Civics" },
  { id: "general-science", name: "General Science" },
  { id: "general-math", name: "General Math" },
];

export function generateMockChapters(subjectId: string): Chapter[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `${subjectId}-chapter-${i + 1}`,
    name: `Chapter ${i + 1}`,
    subjectId,
    topics: Array.from({ length: 3 }, (_, j) => ({
      id: `${subjectId}-chapter-${i + 1}-topic-${j + 1}`,
      name: `Topic ${j + 1}`,
      chapterId: `${subjectId}-chapter-${i + 1}`,
    })),
  }));
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}