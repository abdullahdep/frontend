import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 mr-2 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">Safar Academy</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your path to academic excellence. We provide comprehensive study materials for students in grades 9-12.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/subjects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-muted-foreground hover:text-foreground transition-colors">
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/subjects/english" className="text-muted-foreground hover:text-foreground transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link to="/subjects/math" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link to="/subjects/biology" className="text-muted-foreground hover:text-foreground transition-colors">
                  Biology
                </Link>
              </li>
              <li>
                <Link to="/subjects/physics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Physics
                </Link>
              </li>
              <li>
                <Link to="/subjects/chemistry" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chemistry
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">info@safaracademy.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">+92-300-1234567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">
                  123 Education Street, Lahore, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Safar Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;