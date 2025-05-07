import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookOpen, GraduationCap } from 'lucide-react';
import { useContentStore } from '../../store/content-store';
import SubjectCard from '../../components/subject/subject-card';
import { useAuthStore } from '../../store/auth-store';
import PremiumBanner from '../../components/shared/premium-banner';

const SubjectsList = () => {
  const { subjects } = useContentStore();
  const { user, isAuthenticated } = useAuthStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Explore Our Subjects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive study materials designed to help you excel in your exams.
            Choose a subject to get started.
          </p>
        </motion.div>
      </div>
      
      {isAuthenticated && !user?.isPremium && <PremiumBanner />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {subjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}
      </div>
      
      <div className="mt-16">
        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose Safar Academy?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-muted-foreground">
                Access a vast library of MCQs, short questions, and practice tests for all subjects
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert-Curated Materials</h3>
              <p className="text-muted-foreground">
                Study materials designed by experienced educators aligned with your curriculum
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Bookmark className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Monitor your performance with detailed analytics and improvement suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;