import Quiz from "./features/quiz/ui/Quiz/Quiz.tsx";
import Container from "./ui/Container";
import { QuizProvider } from "./context/QuizContext";

export default function App() {
    return (
        <QuizProvider>
            <Container>
                <Quiz />
            </Container>
        </QuizProvider>
    );
}