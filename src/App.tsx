import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/layout';
import HomePage from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import SubjectsList from './pages/subject/subjects-list';
import SubjectDetail from './pages/subject/subject-detail';
import TestView from './pages/test/test-view';
import PremiumPage from './pages/premium/upgrade';
import { useAuthStore } from './store/auth-store';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subjects" element={<SubjectsList />} />
        <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
        <Route path="/premium" element={<PremiumPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/test/:topicId/:testId" 
          element={
            <ProtectedRoute>
              <TestView />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;