import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, BookOpenCheck, Award, Users, Star } from 'lucide-react';

import { Button } from '../components/ui/button';
import { useAuthStore } from '../store/auth-store';
import { SUBJECTS } from '../lib/utils';

const HomePage = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  const featuredSubjects = SUBJECTS.slice(0, 6);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                  Your Path to <span className="text-primary">Academic Excellence</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                  Comprehensive study materials for grades 9-12. Practice, learn, and excel in your exams with Safar Academy.
                </p>
                <div className="flex flex-wrap gap-4">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button size="lg">
                        Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button size="lg">
                          Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline">
                          Login
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2 w-full px-4 md:px-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative max-w-[500px] mx-auto"
              >
                <div className="w-full h-[350px] sm:h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden border border-border shadow-xl">
                  <div className="absolute top-4 left-4 right-4 h-12 bg-card rounded-lg border border-border flex items-center px-4">
                    <div className="w-3 h-3 bg-error rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                    <div className="flex-1 text-center text-sm font-medium truncate">Safar Academy - Physics Quiz</div>
                  </div>
                  <div className="absolute top-20 left-4 right-4 bottom-4 bg-card rounded-lg border border-border p-4 overflow-y-auto">
                    <div className="mb-4">
                      <h3 className="font-medium mb-4">Q. What is the SI unit of force?</h3>
                      <div className="space-y-3">
                        <div className="p-3 border border-input rounded-md hover:bg-accent hover:border-primary transition-all">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-2 text-xs">A</div>
                            <span>Watt</span>
                          </div>
                        </div>
                        <div className="p-3 border border-primary bg-accent rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 text-xs">B</div>
                            <span>Newton</span>
                          </div>
                        </div>
                        <div className="p-3 border border-input rounded-md hover:bg-accent hover:border-primary transition-all">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-2 text-xs">C</div>
                            <span>Joule</span>
                          </div>
                        </div>
                        <div className="p-3 border border-input rounded-md hover:bg-accent hover:border-primary transition-all">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-2 text-xs">D</div>
                            <span>Pascal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Button size="sm">Next Question</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Subjects Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Subjects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive study materials across a wide range of subjects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  to={`/subjects/${subject.id}`}
                  className="block p-6 bg-card rounded-lg border border-border hover:border-primary transition-all"
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center mr-4">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Comprehensive materials for grade 9-12
                      </p>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/subjects">
              <Button variant="outline" size="lg">
                View All Subjects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Safar Academy?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide innovative learning solutions designed to help students excel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BookOpenCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Content</h3>
              <p className="text-muted-foreground">
                Thousands of MCQs and short questions covering all subjects and topics
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert-Curated</h3>
              <p className="text-muted-foreground">
                Materials designed by experienced educators aligned with curriculum
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
              <p className="text-muted-foreground">
                Track your progress and receive recommendations for improvement
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Feedback</h3>
              <p className="text-muted-foreground">
                Receive instant feedback on your answers to improve understanding
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Excel in Your Exams?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already benefiting from Safar Academy's comprehensive study materials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  {!user?.isPremium && (
                    <Link to="/premium">
                      <Button size="lg" variant="outline">
                        Upgrade to Premium
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">
                      Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;