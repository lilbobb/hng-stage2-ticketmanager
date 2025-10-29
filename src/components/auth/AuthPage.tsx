import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { validateEmail, validatePassword } from '../../utils/validation';

interface AuthPageProps {
  mode: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onNavigate }) => {
  const { login, signup } = useAuth();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const success = mode === 'login'
        ? await login(email, password)
        : await signup(email, password);

      if (success) {
        showSuccess(`${mode === 'login' ? 'Login' : 'Signup'} successful!`);
        setTimeout(() => onNavigate('dashboard'), 1000);
      } else {
        showError(
          mode === 'login'
            ? 'Invalid credentials. Please try again.'
            : 'Email already exists. Please use a different email.'
        );
      }
    } catch (error) {
      showError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {toast && <Toast {...toast} onClose={hideToast} />}

      <div className="w-full max-w-md">
        <div className="bg-[#0B0B12] rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#EDEDED] mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#9CA3AF]">
              {mode === 'login' ? 'Enter your credentials to continue' : 'Sign up to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-[#9CA3AF]">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="your@email.com"
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate(mode === 'login' ? 'signup' : 'login')}
              className="text-[#EDEDED] hover:text-[#3B82F6] font-medium"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-[#9CA3AF] hover:text-[#3B82F6] text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};