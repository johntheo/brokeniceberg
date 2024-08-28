import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuestionDisplay from '../components/QuestionDisplay';
import LanguageSelector from '../components/LanguageSelector';
import InfoModal from '../components/InfoModal';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<string>('en');
  const [questionId, setQuestionId] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [questionText, setQuestionText] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const colorCombinations = [
    { bg: 'bg-blue-500', text: 'text-white' },
    { bg: 'bg-red-500', text: 'text-black' },
    { bg: 'bg-green-500', text: 'text-black' },
    { bg: 'bg-yellow-500', text: 'text-black' },
  ];

  useEffect(() => {
    const lang = searchParams.get('lang') || 'en';
    const id = searchParams.get('id') ? parseInt(searchParams.get('id')!) : Math.floor(Math.random() * 100) + 1;
    setLanguage(lang);
    setQuestionId(id);

    fetchQuestion(lang, id);
  }, [searchParams]);

  const fetchQuestion = async (lang: string, id: number) => {
    const response = await import(`../assets/${lang}.json`);
    const questions = response.questions;
    setQuestionText(questions[id % questions.length]);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setSearchParams({ lang: newLang, id: String(questionId) });
    fetchQuestion(newLang, questionId);
  };

  const handleNewQuestion = () => {
    const newId = Math.floor(Math.random() * 100) + 1;
    setQuestionId(newId);
    setSearchParams({ lang: language, id: String(newId) });
    fetchQuestion(language, newId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(questionText);
  };

  // Change colors
  const randomColors = colorCombinations[Math.floor(Math.random() * colorCombinations.length)];

  return (
    <div className={`${randomColors.bg} ${randomColors.text} h-screen flex flex-col`}>
      <div className="flex justify-between p-4">
        <InfoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} />
      </div>
      <QuestionDisplay 
        questionId={questionId} 
        questionText={questionText} 
        onCopy={handleCopy} 
        onNewQuestion={handleNewQuestion} 
      />
    </div>
  );
};

export default Home;