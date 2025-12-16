import React from 'react';
import { AnswerStyle } from '../types';
import { STYLE_LABELS } from '../constants';
import { Sparkles, ChevronDown } from 'lucide-react';

interface BookInputsProps {
  question: string;
  setQuestion: (q: string) => void;
  selectedStyle: AnswerStyle;
  setStyle: (s: AnswerStyle) => void;
  onReveal: () => void;
  isLoading: boolean;
}

const BookInputs: React.FC<BookInputsProps> = ({
  question,
  setQuestion,
  selectedStyle,
  setStyle,
  onReveal,
  isLoading
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-8 animate-fade-in">
      {/* Title Section */}
      <div className="text-center space-y-2 mb-4">
        <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-300 animate-float">
                <Sparkles size={32} />
            </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-100 serif-font">
          解答之書
        </h1>
        <p className="text-indigo-200/60 text-sm tracking-widest uppercase">The Book of Answers</p>
      </div>

      <div className="w-full space-y-6">
        {/* Style Selection */}
        <div className="relative group">
          <label className="block text-xs text-indigo-300 mb-2 uppercase tracking-wider font-semibold ml-1">
            解答風格 (Style)
          </label>
          <div className="relative">
            <select
              value={selectedStyle}
              onChange={(e) => setStyle(e.target.value as AnswerStyle)}
              disabled={isLoading}
              className="w-full appearance-none bg-black/40 border border-indigo-500/30 text-indigo-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all cursor-pointer hover:bg-black/50"
            >
              {Object.entries(STYLE_LABELS).map(([key, label]) => (
                <option key={key} value={key} className="bg-slate-900">
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Question Input */}
        <div>
          <label className="block text-xs text-indigo-300 mb-2 uppercase tracking-wider font-semibold ml-1">
            心中的疑問 (Optional)
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
            placeholder="專注想著你的問題，或是將它寫在這裡..."
            className="w-full bg-black/40 border border-indigo-500/30 text-white rounded-lg px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none placeholder-indigo-300/20"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onReveal}
          disabled={isLoading}
          className="w-full group relative py-4 px-6 rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center justify-center space-x-2">
            <span className="text-white font-bold tracking-widest text-lg serif-font">
              {isLoading ? '連結宇宙中...' : '翻開解答'}
            </span>
            {!isLoading && <Sparkles size={18} className="text-amber-200" />}
          </div>
          
          {/* Button Glow Effect */}
          <div className="absolute -inset-1 rounded-lg blur opacity-20 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:opacity-40 transition duration-200"></div>
        </button>
        
        <p className="text-center text-xs text-indigo-400/40">
            請閉上眼睛，在心中默念問題三遍，再點擊按鈕
        </p>
      </div>
    </div>
  );
};

export default BookInputs;