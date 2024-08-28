import React from 'react';

interface QuestionDisplayProps {
  questionId: number;
  questionText: string;
  onCopy: () => void;
  onNewQuestion: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questionId, questionText, onCopy, onNewQuestion }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-3xl">#{questionId}</p>
      <p className="text-xl mt-2">{questionText}</p>
      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={onCopy} className="outline">Copy</button>
        <button onClick={onNewQuestion} className="outline">New Question</button>
      </div>
    </div>
  );
};

export default QuestionDisplay;