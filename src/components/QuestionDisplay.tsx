import React from 'react';

interface QuestionDisplayProps {
  questionId: number;
  questionText: string;
  onCopyText: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questionId, questionText, onCopyText }) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-full h-full cursor-pointer"
      onClick={onCopyText}
    >
      <p className="text-3xl">#{questionId}</p>
      <p className="text-xl mt-4 w-full max-w-[70%] break-words">{questionText}</p>
    </div>
  );
};

export default QuestionDisplay;