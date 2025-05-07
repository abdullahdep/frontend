import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime } from '../../lib/utils';

interface TestTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const TestTimer: React.FC<TestTimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  
  // Calculate progress percentage
  const progress = (timeLeft / duration) * 100;
  
  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft <= 60) return 'bg-error';
    if (timeLeft <= 300) return 'bg-warning';
    return 'bg-primary';
  };

  useEffect(() => {
    if (timeLeft <= 300 && timeLeft > 60) {
      setIsWarning(true);
      setTimeout(() => setIsWarning(false), 500);
    }
    
    if (timeLeft <= 60) {
      setIsWarning(!isWarning);
    }
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp, isWarning]);

  return (
    <div className="sticky top-16 z-10 bg-background border-b border-border mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="font-medium">Time Remaining</span>
          </div>
          
          <div className={`font-bold text-lg ${timeLeft <= 60 ? 'text-error' : timeLeft <= 300 ? 'text-warning' : ''}`}>
            {isWarning && timeLeft <= 300 ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: timeLeft <= 60 ? Infinity : 0 }}
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                </motion.div>
                {formatTime(timeLeft)}
              </div>
            ) : (
              formatTime(timeLeft)
            )}
          </div>
        </div>
        
        <div className="w-full h-1 bg-muted mt-2">
          <div 
            className={`h-full transition-all duration-300 ease-linear ${getColorClass()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TestTimer;