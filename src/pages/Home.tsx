import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiInfo, FiClipboard, FiShuffle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import QuestionDisplay from '../components/QuestionDisplay';
import LanguageSelector from '../components/LanguageSelector';
import InfoModal from '../components/InfoModal';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<string>('en');
  const [questionId, setQuestionId] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [questionText, setQuestionText] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

  const handleCopyText = () => {
    navigator.clipboard.writeText(questionText);
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-full max-h-[80vh] flex flex-col p-8">
        <CardHeader>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              <FiInfo className="h-6 w-6" />
            </Button>
            <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} />
          </div>
        </CardHeader>

        <CardContent className="flex-grow flex items-center justify-center">
          <QuestionDisplay 
            questionId={questionId} 
            questionText={questionText} 
            onCopyText={handleCopyText} 
          />
        </CardContent>

        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" onClick={handleCopyURL}>
            <FiClipboard className="h-6 w-6" />
          </Button>
          <Button variant="outline" onClick={handleNewQuestion}>
            <FiShuffle className="h-6 w-6" />
          </Button>
        </CardFooter>
      </Card>

      <InfoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;