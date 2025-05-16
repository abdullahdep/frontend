import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Subject } from '../../types';

interface SubjectCardProps {
  subject: Subject;
  index: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={`/subjects/${subject.id}`}>
        <Card className="h-full hover:border-primary transition-all duration-300">
          <CardHeader>
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{subject.name}</CardTitle>
            <CardDescription>
              Comprehensive study material for grade 9-12
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore MCQs, short questions, and practice tests to excel in {subject.name}.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="flex items-center text-primary">
              Explore <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default SubjectCard;