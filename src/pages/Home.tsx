import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiInfo, FiClipboard, FiShuffle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import QuestionDisplay from "../components/QuestionDisplay";
import LanguageSelector from "../components/LanguageSelector";
import InfoModal from "../components/InfoModal";
import ReactGA from "react-ga4"; // Import the ReactGA library for GA4

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguage] = useState<string>("en");
  const [questionId, setQuestionId] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [questionText, setQuestionText] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const lang = searchParams.get("lang") || "en";
    const id = searchParams.get("id")
      ? parseInt(searchParams.get("id")!)
      : Math.floor(Math.random() * 100) + 1;
    setLanguage(lang);
    setQuestionId(id);

    // Update the URL with default values if necessary
    if (!searchParams.get('lang') || !searchParams.get('id')) {
      setSearchParams({ lang, id: String(id) });
    }

    fetchQuestion(lang, id);
  }, [searchParams, setSearchParams]);

  const fetchQuestion = async (lang: string, id: number) => {
    const response = await import(`../assets/${lang}.json`);
    const questions = response.questions;
    setQuestionText(questions[id % questions.length]);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setSearchParams({ lang: newLang, id: String(questionId) });
    fetchQuestion(newLang, questionId);

    ReactGA.event({
      category: "User",
      action: "change_laguage",
      label: newLang,
    });
  };

  const handleNewQuestion = () => {
    const newId = Math.floor(Math.random() * 100) + 1;
    setQuestionId(newId);
    setSearchParams({ lang: language, id: String(newId) });
    fetchQuestion(language, newId);
    ReactGA.event({
      category: 'User',
      action: 'new_question',
      label: language,
      value: questionId,
    });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(questionText);
    ReactGA.event({
      category: "User",
      action: "copy_question",
      label: language,
      value: questionId,
    });
    triggerToast("Question copied to the clipboard!");
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    ReactGA.event({
      category: "User",
      action: "share_question",
      label: window.location.href,
    });
    triggerToast("Link copied to clipboard. Thanks for sharing!");
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    // Reset toastMessage after it has been shown to allow re-triggering
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // This delay allows the toast to dismiss before resetting the state
  };

  return (
    <ToastProvider swipeDirection="up">
      <div className="h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl h-full max-h-[80vh] flex flex-col p-8">
          <CardHeader>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setModalOpen(true);
                  ReactGA.event({
                    category: "User",
                    action: "click_info",
                  });
                }}
              >
                <FiInfo className="h-6 w-6" />
              </Button>
              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
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

        {toastMessage && (
          <Toast className="w-full max-w-sm h-12 flex items-center justify-center bg-gray-800 text-white rounded-md shadow-lg">
            <div className="text-sm">{toastMessage}</div>
            <ToastClose
              onClick={() => setToastMessage(null)}
              className="ml-4 text-white"
            />
          </Toast>
        )}

        {/* ToastViewport positioned at the top-center of the page with a narrow height */}
        <ToastViewport className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4" />
      </div>
    </ToastProvider>
  );
};

export default Home;
