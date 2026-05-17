export interface InterviewEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export interface CreateInterviewRequest {
  role: string;
  experience: string;
  techStack: string;
  difficulty: string;
  numberOfQuestions: number;
}

export interface InterviewSession {
  id: string;

  userEmail: string;

  role: string;

  experience: string;

  techStack: string;

  difficulty: string;

  numberOfQuestions: number;

  questions: string[];

  answers: Record<number, string>;

  completed: boolean;

  evaluation: InterviewEvaluation;
}

export interface SubmitInterviewRequest {
  answers: Record<number, string>;
}

export interface DashboardStats {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  bestScore: number;
}