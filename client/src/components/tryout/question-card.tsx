import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Question } from "@/lib/tryout-data";

type QuestionCardProps = {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
};

export function QuestionCard({
  question,
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  selectedAnswer,
  onSelectAnswer,
  onPrevQuestion,
  onNextQuestion
}: QuestionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium">
            {currentQuestionIndex + 1}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            dari {totalQuestions} soal
          </span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 mr-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="text-sm font-medium">{timeRemaining}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4">{question.text}</h4>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <label 
              key={option.id} 
              className={`flex items-start p-3 border ${
                selectedAnswer === option.id 
                  ? "border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20" 
                  : "border-gray-200 dark:border-gray-700"
              } rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
            >
              <input 
                type="radio" 
                name="answer" 
                className="w-5 h-5 mt-0.5 text-primary-600 rounded-full"
                checked={selectedAnswer === option.id}
                onChange={() => onSelectAnswer(option.id)}
              />
              <span className="ml-3">{option.text}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
          onClick={onPrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Sebelumnya</span>
        </button>
        
        <button 
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          onClick={onNextQuestion}
        >
          <span>Selanjutnya</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
