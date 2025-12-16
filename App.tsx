import React, { useState } from 'react';
import { AnswerStyle, AnswerState } from './types';
import { fetchAnswer } from './services/openRouterService';
import BookInputs from './components/BookInputs';
import AnswerReveal from './components/AnswerReveal';

export default function App() {
  const [question, setQuestion] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<AnswerStyle>(AnswerStyle.MYSTERIOUS);
  
  const [answerState, setAnswerState] = useState<AnswerState>({
    hasAsked: false,
    isLoading: false,
    answer: null,
    error: null
  });

  const handleReveal = async () => {
    setAnswerState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate a minimum "thinking" or "connecting" time for UX (at least 1.5s)
      const minDelayPromise = new Promise(resolve => setTimeout(resolve, 1500));
      const apiPromise = fetchAnswer(question, selectedStyle);

      const [_, answer] = await Promise.all([minDelayPromise, apiPromise]);

      setAnswerState({
        hasAsked: true,
        isLoading: false,
        answer: answer,
        error: null
      });
    } catch (err: any) {
      setAnswerState({
        hasAsked: false,
        isLoading: false,
        answer: null,
        error: err.message || "發生未知錯誤，請重試。"
      });
    }
  };

  const handleReset = () => {
    setQuestion('');
    setAnswerState({
      hasAsked: false,
      isLoading: false,
      answer: null,
      error: null
    });
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1033] to-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Stars/Dust effect could go here */}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl glass-panel rounded-2xl p-8 md:p-12 min-h-[600px] flex flex-col justify-center shadow-2xl">
        
        {answerState.error && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-2 rounded-lg text-sm text-center">
            {answerState.error}
          </div>
        )}

        {!answerState.hasAsked ? (
           <BookInputs 
             question={question}
             setQuestion={setQuestion}
             selectedStyle={selectedStyle}
             setStyle={setSelectedStyle}
             onReveal={handleReveal}
             isLoading={answerState.isLoading}
           />
        ) : (
          <AnswerReveal 
            answer={answerState.answer || ""} 
            onReset={handleReset}
          />
        )}
        
        <footer className="absolute bottom-4 left-0 w-full text-center text-indigo-500/20 text-[10px] tracking-widest">
            POWERED BY OPENROUTER & GEMMA
        </footer>
      </div>
    </div>
  );
}