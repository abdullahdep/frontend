import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Book, ListChecks, GraduationCap } from 'lucide-react';

import { useContentStore } from '../../store/content-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../store/auth-store';
import PremiumBanner from '../../components/shared/premium-banner';
import { GRADES } from '../../lib/utils';

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { subjects, chapters, setActiveSubject, getChaptersBySubject } = useContentStore();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  
  const subject = subjects.find(s => s.id === subjectId);
  const subjectChapters = subjectId ? getChaptersBySubject(subjectId) : [];
  
  useEffect(() => {
    if (subjectId) {
      setActiveSubject(subjectId);
    }
    
    return () => {
      setActiveSubject(null);
    };
  }, [subjectId, setActiveSubject]);
  
  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
        <p className="text-muted-foreground mb-6">
          The subject you're looking for doesn't exist.
        </p>
        <Link to="/subjects">
          <Button>Go back to subjects</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/subjects" className="hover:text-foreground transition-colors">
            Subjects
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>{subject.name}</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-4">{subject.name}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore comprehensive study materials for {subject.name}, designed to help you master the concepts and excel in your exams.
          </p>
        </motion.div>
      </div>
      
      {isAuthenticated && !user?.isPremium && <PremiumBanner />}
      
      {/* Grade Selection */}
      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Select Your Grade</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GRADES.map((grade) => (
            <motion.div
              key={grade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                className={`w-full p-6 rounded-lg border transition-all duration-300 ${
                  selectedGrade === grade 
                    ? 'bg-primary/10 border-primary shadow-lg' 
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className={`h-6 w-6 ${selectedGrade === grade ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Grade {grade}</h3>
                  <p className="text-sm text-muted-foreground">
                    {subject.name} curriculum for grade {grade}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Chapters Section - Only show when grade is selected */}
      {selectedGrade && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Chapters for Grade {selectedGrade}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/subjects/${subjectId}/chapters/${chapter.id}`}>
                  <Card className="h-full hover:border-primary transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Book className="h-5 w-5 text-primary mr-3" />
                        {chapter.name}
                      </CardTitle>
                      <CardDescription>
                        {chapter.topics.length} topic{chapter.topics.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {chapter.topics.map((topic) => (
                          <div key={topic.id} className="flex items-center">
                            <ListChecks className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-muted-foreground">{topic.name}</span>
                          </div>
                        ))}
                        <div className="mt-4">
                          <Button variant="ghost" className="text-primary">
                            Explore Chapter <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetail;