import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../store/auth-store';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 mr-2 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">Safar Academy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/subjects" className="text-muted-foreground hover:text-foreground transition-colors py-2">
              Subjects
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                    Admin
                  </Link>
                )}
                {!user?.isPremium && (
                  <Link to="/premium" className="text-secondary font-medium hover:text-secondary/90 transition-colors py-2">
                    Upgrade
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {user?.name}
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              className="text-foreground p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-in">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/subjects"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
              onClick={toggleMenu}
            >
              Subjects
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                    onClick={toggleMenu}
                  >
                    Admin
                  </Link>
                )}
                {!user?.isPremium && (
                  <Link
                    to="/premium"
                    className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-accent"
                    onClick={toggleMenu}
                  >
                    Upgrade to Premium
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;