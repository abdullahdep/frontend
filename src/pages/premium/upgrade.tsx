import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Crown, Lightbulb, BookOpenCheck, Brain, AlertCircle, CheckCircle } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../store/auth-store';

const PremiumPage = () => {
  const { user, upgradeAccount, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleUpgrade = async () => {
    if (!user) {
      navigate('/login?redirect=/premium');
      return;
    }
    
    try {
      await upgradeAccount();
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Failed to upgrade:', error);
    }
  };
  
  if (user?.isPremium) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">You're already a Premium member!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for your support. You have full access to all premium features.
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    );
  }
  
  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Upgrade Successful!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for upgrading to Premium. You now have full access to all premium features.
        </p>
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to all premium content and features to boost your exam preparation.
          </p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Star className="h-6 w-6 text-secondary fill-secondary mr-2" />
            Premium Features
          </h2>
          
          <ul className="space-y-4">
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Complete Access to All Content</h3>
                <p className="text-muted-foreground">
                  Unlock all subjects, chapters, and topics without any restrictions.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Detailed Explanations</h3>
                <p className="text-muted-foreground">
                  Get in-depth explanations for all MCQs to understand concepts better.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">AI-Powered Feedback</h3>
                <p className="text-muted-foreground">
                  Receive instant AI feedback on your short answer submissions.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Advanced Practice Tests</h3>
                <p className="text-muted-foreground">
                  Access to longer, more comprehensive tests with varied question types.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium">Progress Analysis</h3>
                <p className="text-muted-foreground">
                  Get detailed insights into your performance with recommendations for improvement.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-2">Premium Membership</h2>
            <p className="text-muted-foreground mb-6">
              Unlock your full potential with Safar Academy Premium
            </p>
            
            <div className="mb-6">
              <p className="text-4xl font-bold">
                PKR 500
                <span className="text-muted-foreground text-lg font-normal">/month</span>
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="w-full mb-4"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Upgrade Now'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Cancel anytime. No hidden fees.
            </p>
          </div>
          
          <div className="border-t border-border px-8 py-4">
            <p className="font-medium mb-2">What's included:</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Unlimited access to all subjects</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">MCQ explanations & AI feedback</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Advanced practice tests</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Performance analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Why Premium Makes a Difference</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Better Understanding</h3>
            <p className="text-muted-foreground">
              Detailed explanations help you understand concepts more thoroughly, not just memorize answers.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
              <BookOpenCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Practice</h3>
            <p className="text-muted-foreground">
              More questions, harder tests, and varied formats prepare you for any exam scenario.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
            <p className="text-muted-foreground">
              AI feedback tailors suggestions to your specific needs, helping you improve faster.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 sm:p-8 mb-12">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">100% Satisfaction Guarantee</h3>
            <p className="text-muted-foreground">
              Not happy with Premium? Contact us within 7 days of your purchase, and we'll refund your payment.
              No questions asked. We're confident that you'll love the premium experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;