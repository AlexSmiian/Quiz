import type {Question} from "../../../../entities/quiz/model/types.ts";
import styles from "./questionScreen.module.scss";
import TitleH2 from "../../../../ui/TitleH2";
import Button from "./ButtonAnswer";
import ButtonNextStep from "./ButtonNextStep";

export default function QuestionScreen({
                                           question,
                                           selectedAnswer,
                                           onAnswer,
                                           onNext,
                                       }: {
    question: Question;
    selectedAnswer: string | undefined;
    onAnswer: (answerId: string) => void;
    onNext: () => void;
}) {
    return (
        <div className={styles.screen}>
            <TitleH2>
                {question.question}
            </TitleH2>

            <div className={styles.answersWrapper}>
                {question.answers.map((answer) => (
                    <Button key={answer.id} selectedAnswer={selectedAnswer} answer={answer} onAnswer={onAnswer}  />
                ))}
            </div>
            {selectedAnswer && (
                <ButtonNextStep onNext={onNext}/>
            )}
        </div>
    );
}