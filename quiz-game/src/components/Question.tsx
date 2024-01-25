import React from 'react';

interface QuestionProps {
  question: {
    text: string;
    options: string[];
    correctAnswer: string;
  };
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const handleOptionClick = (selectedOption: string) => {
    const isCorrect = selectedOption === question.correctAnswer;
    onAnswer(isCorrect);
  };
  

  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
