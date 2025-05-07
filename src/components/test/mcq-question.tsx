import React, { useState } from 'react';
import { MCQQuestion as MCQQuestionType, MCQOption } from '../../types';
import { Button } from '../ui/button';
import { Check, X, HelpCircle } from 'lucide-react';

interface MCQQuestionProps {
  question: MCQQuestionType;
  number: number;
  onAnswerSelected: (questionId: string, optionId: string, isCorrect: boolean) => void;
  reviewMode?: boolean;
  selectedOption?: string;
  isPremium?: boolean;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ 
  question, 
  number, 
  onAnswerSelected, 
  reviewMode = false,
  selectedOption,
  isPremium = false
}) => {
  const [selected, setSelected] = useState<string | undefined>(selectedOption);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (option: MCQOption) => {
    if (reviewMode) return;
    
    setSelected(option.id);
    onAnswerSelected(question.id, option.id, option.isCorrect);
  };

  const isCorrectOption = (option: MCQOption) => {
    return reviewMode && option.isCorrect;
  };

  const isIncorrectSelectedOption = (option: MCQOption) => {
    return reviewMode && selected === option.id && !option.isCorrect;
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-lg border border-border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">
          <span className="text-primary mr-2">Q{number}.</span>
          {question.text}
        </h3>
        {reviewMode && question.explanation && isPremium && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-muted-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </Button>
        )}
      </div>
      
      <div className="space-y-3 mt-4">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={`p-3 border rounded-md cursor-pointer transition-all ${
              selected === option.id ? 'border-primary bg-accent' : 'border-input'
            } ${isCorrectOption(option) ? 'border-success bg-success/10' : ''}
            ${isIncorrectSelectedOption(option) ? 'border-error bg-error/10' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-3 text-sm font-medium">
                {['A', 'B', 'C', 'D'][question.options.indexOf(option)]}
              </span>
              <span className="flex-1">{option.text}</span>
              {reviewMode && option.isCorrect && (
                <Check className="h-5 w-5 text-success ml-2" />
              )}
              {isIncorrectSelectedOption(option) && (
                <X className="h-5 w-5 text-error ml-2" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {reviewMode && showExplanation && question.explanation && (
        <div className="mt-4 p-4 bg-accent/50 rounded-md border border-border">
          <h4 className="font-medium mb-1">Explanation:</h4>
          <p className="text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;