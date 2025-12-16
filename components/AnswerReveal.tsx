import React, { useEffect, useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

interface AnswerRevealProps {
  answer: string;
  onReset: () => void;
}

const AnswerReveal: React.FC<AnswerRevealProps> = ({ answer, onReset }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simple delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto min-h-[400px] text-center animate-fade-in">
      
      {/* Decorative Book Border/Frame */}
      <div className={`relative p-8 md:p-12 border-y-2 border-indigo-500/30 w-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-400 rotate-45 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-indigo-400 rotate-45 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>

        <p className="text-indigo-300/50 text-xs tracking-[0.3em] uppercase mb-8">The Answer Is</p>

        <h2 className="text-3xl md:text-5xl leading-tight font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-indigo-200 serif-font drop-shadow-lg mb-8">
           “ {answer} ”
        </h2>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleCopy}
            className="p-2 text-indigo-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="複製解答"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <div className={`mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={onReset}
          className="group flex items-center space-x-2 text-indigo-300 hover:text-white transition-colors px-6 py-3 rounded-full border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/30"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-sm tracking-wider">再次尋求指引</span>
        </button>
      </div>

    </div>
  );
};

export default AnswerReveal;