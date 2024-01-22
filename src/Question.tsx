import { useEffect, useState } from "react";

interface QuestionProps {
  questions: any[];
  addToLeaderboard: (score: number) => void;
}

const Question = ({ questions, addToLeaderboard }: QuestionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  console.log(`currentQuestionIndex : ${currentQuestionIndex}`);
  console.log(`score : ${score}`);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        alert(`Game Over! Your score is ${score}`);
        addToLeaderboard(score);
        setScore(0);
        setCurrentQuestionIndex(0);
        setGameOver(false);
      }, 0);
    }
  }, [gameOver]);

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }
  const shuffleAnswers = (answers: string[]) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return shuffledAnswers;
  };
  const handleAnswerClick = (selectedAnswer: string) => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      console.log(`selectedAnswer : ${selectedAnswer} = ${correctAnswer}`);
      if (selectedAnswer === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameOver(true);
      }
    }
  };

  return (
    <div className="sec-qus">
      <div className="qus-title">
        <h2>- Question {currentQuestionIndex + 1} -</h2>
        <p>{questions[currentQuestionIndex].question}</p>
      </div>
      {questions[currentQuestionIndex] ? (
        <>
          <div className="card">
            <div className="card-body">
              <ul>
                {shuffleAnswers(questions[currentQuestionIndex].answers).map(
                  (answer: string, index: number) => (
                    <li key={index} onClick={() => handleAnswerClick(answer)}>
                      {answer}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div>No question available</div>
      )}
    </div>
  );
};

export default Question;
