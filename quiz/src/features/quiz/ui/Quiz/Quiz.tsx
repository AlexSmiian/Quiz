import QuestionScreen from "../QuestionScreen/QuestionScreen.tsx";
import EmailScreen from "../EmailScreen/EmailScreen.tsx";
import ResultScreen from "../ResultScreen/ResultScreen.tsx";
import useQuiz from "../../../hooks/useQuiz.ts";

export default function Quiz() {
    const {
        state,
        currentQuestion,
        questions,
        handleAnswer,
        handleNext,
        handleEmailChange,
        handleComplete,
        handleRestart
    } = useQuiz();

    if (state.isCompleted) {
        return (
            <ResultScreen
                email={state.email}
                selectedAnswers={state.selectedAnswers}
                onRestart={handleRestart}
            />
        );
    }

    if (state.currentStep < questions.length) {
        return (
            <QuestionScreen
                question={currentQuestion}
                selectedAnswer={state.selectedAnswers[currentQuestion.id]}
                onAnswer={(answerId) => handleAnswer(currentQuestion.id, answerId)}
                onNext={handleNext}
            />
        );
    }

    return (
        <EmailScreen
            email={state.email}
            onChange={handleEmailChange}
            onSubmit={handleComplete}
        />
    );
}
