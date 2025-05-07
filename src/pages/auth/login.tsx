import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';

import { useAuthStore } from '../../store/auth-store';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  // For demo purposes - quick login for admin
  const handleAdminLogin = async () => {
    try {
      setError(null);
      await login('admin@safaracademy.com', 'password123');
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin login failed. Please try again.');
    }
  };

  // For demo purposes - quick login for student
  const handleStudentLogin = async () => {
    try {
      setError(null);
      await login('student@example.com', 'password123');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Student login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Log in to your Safar Academy account</p>
        </div>
        
        {error && (
          <div className="bg-error/10 border border-error rounded-md p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-error mr-2" />
            <p className="text-error">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : (
              <>
                <LogIn className="h-4 w-4 mr-2" /> Log In
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
        
        {/* Demo shortcuts - For demonstration only */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            Demo Accounts (Click to login instantly)
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1" onClick={handleAdminLogin}>
              Admin Demo
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleStudentLogin}>
              Student Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;