'use client';

import { useState, useEffect } from 'react';
import { userApi, configApi } from '@/lib/api';
import { User, OnboardingConfig } from '@/types';
import OnboardingWizard from '@/components/OnboardingWizard';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<OnboardingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configData = await configApi.getConfig();
        setConfig(configData);
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    };

    loadConfig();
    setLoading(false);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Check if user exists
      const existingUser = await userApi.getUserByEmail(email);
      setUser(existingUser);
    } catch {
      // User doesn't exist, we'll create them in the wizard
      setUser({ 
        _id: '', 
        email, 
        currentStep: 1, 
        createdAt: '', 
        updatedAt: '' 
      } as User);
    }
  };

  const handleStartNew = () => {
    setUser(null);
    setEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user && config) {
    return <OnboardingWizard user={user} config={config} onUserUpdate={setUser} onStartNew={handleStartNew} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Onboarding
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to start the onboarding process
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Onboarding
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
