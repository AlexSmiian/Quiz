import { useEffect, useState } from "react";
import type {QuizState} from "../../entities/quiz/model/types.ts";
import {storage} from "../../shared/lib/storage.ts";
import {questions} from "../../entities/quiz/model/questions.ts";

const STORAGE_KEY = "quiz-state";

export default function useQuiz() {
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

    return {
        state,
        currentQuestion,
        questions,
        handleAnswer,
        handleNext,
        handleEmailChange,
        handleComplete,
        handleRestart
    };
}
