export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    question: string;
    answers: Answer[];
}

export interface QuizState {
    currentStep: number;
    selectedAnswers: Record<string, string>;
    email: string;
    isCompleted: boolean;
}