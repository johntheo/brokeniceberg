import React from 'react';

interface QuestionDisplayProps {
  questionId: number;
  questionText: string;
  onCopy: () => void;
  onNewQuestion: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questionId, questionText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <p className="text-3xl">#{questionId}</p>
      <p className="text-xl mt-2 w-full max-w-[70%] break-words">{questionText}</p>
    </div>
  );
};

export default QuestionDisplay;