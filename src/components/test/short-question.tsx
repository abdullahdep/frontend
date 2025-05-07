import React, { useState, useRef } from 'react';
import { ShortQuestion as ShortQuestionType } from '../../types';
import { Button } from '../ui/button';
import { Camera, Upload, Check, X } from 'lucide-react';

interface ShortQuestionProps {
  question: ShortQuestionType;
  number: number;
  onAnswerSubmitted: (questionId: string, imageUrl?: string) => void;
  reviewMode?: boolean;
  uploadedImageUrl?: string;
  isPremium?: boolean;
}

const ShortQuestion: React.FC<ShortQuestionProps> = ({
  question,
  number,
  onAnswerSubmitted,
  reviewMode = false,
  uploadedImageUrl,
  isPremium = false
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(uploadedImageUrl || null);
  const [showAnswer, setShowAnswer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        onAnswerSubmitted(question.id, imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-lg border border-border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">
          <span className="text-primary mr-2">Q{number}.</span>
          {question.text}
          <span className="ml-2 text-sm text-muted-foreground">
            ({question.marks} marks)
          </span>
        </h3>
        
        {reviewMode && isPremium && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-muted-foreground"
          >
            {showAnswer ? 'Hide Answer' : 'Show Expected Answer'}
          </Button>
        )}
      </div>
      
      {!reviewMode && (
        <div className="mt-4">
          <div className="flex flex-col space-y-4">
            {imagePreview ? (
              <div className="rounded-md overflow-hidden border border-input">
                <img 
                  src={imagePreview} 
                  alt="Uploaded answer" 
                  className="max-w-full h-auto"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-input rounded-md p-8 flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-2">Upload your handwritten answer</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Take a clear photo of your answer and upload it
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCameraCapture}
              >
                <Camera className="h-4 w-4 mr-2" />
                {imagePreview ? 'Retake Photo' : 'Take Photo'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
      
      {reviewMode && uploadedImageUrl && (
        <div className="mt-4 rounded-md overflow-hidden border border-input">
          <img 
            src={uploadedImageUrl} 
            alt="Submitted answer" 
            className="max-w-full h-auto"
          />
        </div>
      )}
      
      {reviewMode && showAnswer && (
        <div className="mt-4 p-4 bg-accent/50 rounded-md border border-border">
          <h4 className="font-medium mb-1">Expected Answer:</h4>
          <p className="text-muted-foreground whitespace-pre-line">{question.answer}</p>
        </div>
      )}
    </div>
  );
};

export default ShortQuestion;