export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  modules?: Module[];
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  content?: Content[];
  quizzes?: Quiz[];
}

export interface Content {
  id: number;
  moduleId: number;
  type: 'video' | 'text';
  title: string;
  content: string;
  order: number;
}

export interface Quiz {
  id: number;
  moduleId: number;
  title: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}
