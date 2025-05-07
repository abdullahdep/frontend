import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Check } from 'lucide-react';
import { Button } from '../ui/button';

const PremiumBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg border border-primary/30 p-4 sm:p-6 mb-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-secondary fill-secondary mr-2" />
            <h3 className="text-lg font-semibold">Upgrade to Premium</h3>
          </div>
          <p className="mt-2 text-muted-foreground">
            Get unlimited access to all tests, detailed explanations, and AI feedback.
          </p>
          <ul className="mt-3 space-y-1">
            <li className="flex items-center text-sm">
              <Check className="h-4 w-4 text-success mr-2" />
              <span>Full access to all premium content</span>
            </li>
            <li className="flex items-center text-sm">
              <Check className="h-4 w-4 text-success mr-2" />
              <span>AI-powered feedback on short answers</span>
            </li>
            <li className="flex items-center text-sm">
              <Check className="h-4 w-4 text-success mr-2" />
              <span>Detailed explanations for all MCQs</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/premium">
            <Button className="bg-primary/90 hover:bg-primary">
              <span>Just PKR 500/month</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumBanner;