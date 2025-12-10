import styles from './button.module.scss';

interface AnswerProps {
    id: string;
    text: string;
    isCorrect: boolean;
}

export default function ButtonAnswer ({selectedAnswer,onAnswer,answer}: {
    selectedAnswer: string | undefined;
    onAnswer: (answerId: string) => void;
    answer: AnswerProps
}){
    const { id, text, isCorrect} =answer
    const showResult = selectedAnswer !== undefined;
    const isSelected = selectedAnswer === id;
    const classes = [styles.answerButton];

    if (showResult) {
        if (isCorrect) classes.push(styles.correctAnswer);
        else if (!isCorrect) classes.push(styles.wrongAnswer);
    }

    if (isSelected) classes.push(styles.selectedAnswer);

    return (
        <button
            className={classes.join(" ")}
            onClick={() => !selectedAnswer && onAnswer(id)}
            disabled={selectedAnswer !== undefined}
        >
            {text}
            {showResult && isCorrect && " ✓"}
            {showResult && !isCorrect && " ✗"}
        </button>
    );
}