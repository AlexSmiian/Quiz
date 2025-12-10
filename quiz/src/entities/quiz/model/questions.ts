import type {Question} from "./types.ts";

export const questions: Question[] = [
    {
        id: '1',
        question: 'Яка столиця України?',
        answers: [
            { id: '1a', text: 'Львів', isCorrect: false },
            { id: '1b', text: 'Київ', isCorrect: true },
            { id: '1c', text: 'Одеса', isCorrect: false },
            { id: '1d', text: 'Харків', isCorrect: false }
        ]
    },
    {
        id: '2',
        question: 'Скільки днів у тижні?',
        answers: [
            { id: '2a', text: '5', isCorrect: false },
            { id: '2b', text: '6', isCorrect: false },
            { id: '2c', text: '7', isCorrect: true },
            { id: '2d', text: '8', isCorrect: false }
        ]
    }
];