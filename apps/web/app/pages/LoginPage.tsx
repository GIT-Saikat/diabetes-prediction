import React, { useState } from 'react'
import { Activity, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
  initialMode?: 'signin' | 'signup';
}

const LoginPage = ({ onLogin, initialMode = 'signup' }: LoginPageProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Simulate account storage using localStorage
  const checkAccountExists = (email: string): boolean => {
    const accounts = JSON.parse(localStorage.getItem('diabetesAccounts') || '[]');
    return accounts.some((acc: any) => acc.email === email);
  };

  const createAccount = (name: string, email: string) => {
    const accounts = JSON.parse(localStorage.getItem('diabetesAccounts') || '[]');
    accounts.push({ name, email, createdAt: new Date().toISOString() });
    localStorage.setItem('diabetesAccounts', JSON.stringify(accounts));
  };

  const getAccountName = (email: string): string | null => {
    const accounts = JSON.parse(localStorage.getItem('diabetesAccounts') || '[]');
    const account = accounts.find((acc: any) => acc.email === email);
    return account ? account.name : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (mode === 'signin') {
      // Check if account exists
      if (checkAccountExists(email)) {
        const accountName = getAccountName(email);
        onLogin(accountName || 'User');
      } else {
        // Redirect to create account
        setError('No account found with this email. Please create an account first.');
        setTimeout(() => {
          setMode('signup');
          setError('');
        }, 2000);
      }
    } else {
      // Sign up mode
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }

      if (checkAccountExists(email)) {
        setError('An account with this email already exists. Please sign in instead.');
        setTimeout(() => {
          setMode('signin');
          setError('');
        }, 2000);
        return;
      }

      createAccount(name.trim(), email.trim());
      onLogin(name.trim());
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Activity className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          
          <h1 className="text-center text-indigo-600 mb-2">Diabetes Risk Predictor</h1>
          <p className="text-center text-gray-600 mb-8">
            {mode === 'signup' ? 'Create your account to get started' : 'Sign in to your account'}
          </p>

          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-colors ${
                mode === 'signup'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-colors ${
                mode === 'signin'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                  required={mode === 'signup'}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Your health data is kept private and secure
          </p>
        </div>
      </div>
    </div>
  
  )
}

export default LoginPage