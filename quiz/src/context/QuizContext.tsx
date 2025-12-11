import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { questions } from '../entities/quiz/model/questions';
import { storage } from '../shared/lib/storage';
import type {Question, QuizState} from "../entities/quiz/model/types.ts";

const STORAGE_KEY = "quiz-state";

interface QuizContextType {
    state: QuizState;
    currentQuestion: Question;
    questions: Question[];
    handleAnswer: (questionId: string, answerId: string) => void;
    handleNext: () => void;
    handleEmailChange: (email: string) => void;
    handleComplete: () => void;
    handleRestart: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<QuizState>(() => {
        const saved = storage.get<QuizState>(STORAGE_KEY);
        return saved || {
            currentStep: 0,
            selectedAnswers: {},
            email: '',
            isCompleted: false
        };
    });

    useEffect(() => {
        storage.set(STORAGE_KEY, state);
    }, [state]);

    const handleAnswer = (questionId: string, answerId: string) => {
        setState(prev => ({
            ...prev,
            selectedAnswers: { ...prev.selectedAnswers, [questionId]: answerId }
        }));
    };

    const handleNext = () => {
        setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    };

    const handleEmailChange = (email: string) => {
        setState(prev => ({ ...prev, email }));
    };

    const handleComplete = () => {
        setState(prev => ({ ...prev, isCompleted: true }));
    };

    const handleRestart = () => {
        setState({
            currentStep: 0,
            selectedAnswers: {},
            email: '',
            isCompleted: false
        });
        storage.remove(STORAGE_KEY);
    };

    const currentQuestion = questions[state.currentStep];

    const value = {
        state,
        currentQuestion,
        questions,
        handleAnswer,
        handleNext,
        handleEmailChange,
        handleComplete,
        handleRestart
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuizContext() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuizContext must be used within QuizProvider');
    }
    return context;
}