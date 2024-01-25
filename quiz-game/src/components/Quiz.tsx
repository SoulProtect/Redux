import React, { useState } from 'react';
import Question from './Question';
import Score from './Score';
import domande from './domande';
import './Quiz.css';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Funzione per gestire la risposta 
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Passa alla prossima domanda
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  return (
    <div className="QuizContainer">
    {currentQuestion < domande.length ? (
      <div className="QuestionContainer">
        <Question
          question={domande[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </div>
    ) : (
      <div className="ScoreContainer">
        <Score score={score} />
      </div>
    )}
  </div>
);
};

export default Quiz;
