import { questions } from "../../../../entities/quiz/model/questions.ts";
import styles from "./resultScreen.module.scss";
import TitleH2 from "../../../../ui/TitleH2";

export default function ResultScreen({
                                         email,
                                         selectedAnswers,
                                         onRestart,
                                     }: {
    email: string;
    selectedAnswers: Record<string, string>;
    onRestart: () => void;
}) {
    const getAnswerDetails = (questionId: string, answerId: string) => {
        const question = questions.find((q) => q.id === questionId);
        const answer = question?.answers.find((a) => a.id === answerId);
        return { question: question?.question, answer: answer?.text, isCorrect: answer?.isCorrect };
    };

    const correctCount = Object.entries(selectedAnswers).filter(([qId, aId]) => {
        const details = getAnswerDetails(qId, aId);
        return details.isCorrect;
    }).length;

    return (
        <div className={styles.screen}>
            <TitleH2 classModifier={styles.resultTitle}>
                🎉 Квіз завершено!
            </TitleH2>
            <div className={styles.resultCard}>
                <p className={styles.resultEmail}>
                    <span>Email:</span> {email}
                </p>
                <p className={styles.resultScore}>
                    <strong>Результат:</strong> {correctCount} з {questions.length} правильних відповідей
                </p>

                <div className={styles.answersSection}>
                    <h3 className={styles.answersTitle}>Ваші відповіді:</h3>
                    {Object.entries(selectedAnswers).map(([qId, aId]) => {
                        const details = getAnswerDetails(qId, aId);

                        const answerClasses = [styles.answerText];
                        if (details.isCorrect) answerClasses.push(styles.correctAnswer);
                        else answerClasses.push(styles.wrongAnswer);

                        return (
                            <div key={qId} className={styles.answerItem}>
                                <p className={styles.answerQuestion}>
                                    {details.question} : <span className={answerClasses.join(" ")}>{details.answer} {details.isCorrect ? "✓" : "✗"}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>

                <button className={styles.restartButton} onClick={onRestart}>
                    Пройти квіз заново
                </button>
            </div>
        </div>
    );
}
