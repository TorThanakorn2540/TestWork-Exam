import "./App.css";
import { useState, useEffect } from "react";
import { questionsData } from "./data/questionsData";
import Question from "./Question";
import Leaderboard from "./Leaderboard";

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData);
    setQuestions(shuffledQuestions);
  }, []);

  const addToLeaderboard = (score: number) => {
    const playerName = prompt("Enter your name:") || "Anonymous";
    const updatedLeaderboard = [...leaderboard, { playerName, score }];
    setLeaderboard(updatedLeaderboard);
    shuffleQuestions();
  };
  const shuffleQuestions = () => {
    const shuffledQuestions = shuffleArray(questionsData);
    setQuestions(shuffledQuestions);
  };

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  return (
    <div className="container">
      <div className="title">
        <h1 className="title_name">TRIVIA</h1>
        <div className="icon-game">
          <img src="src/assets/console.png" alt="" />
        </div>
      </div>
      <Question questions={questions} addToLeaderboard={addToLeaderboard} />
      <div className="g-line">
        <div className="lines"></div>
      </div>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;
