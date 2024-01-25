import React from 'react';

type ScoreProps ={
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  const message =
    score >= 4
      ? "Quiz completato!"
      : "Mi dispiace! Non hai superato il quiz. Riprova!";

  return (
    <div>
      <h2>{message}</h2>
      <p>Punteggio: {score}</p>
    </div>
  );
};

export default Score;