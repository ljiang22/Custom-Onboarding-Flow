'use client';

import { useState } from 'react';
import { User, OnboardingConfig, UpdateUserRequest } from '@/types';
import { userApi } from '@/lib/api';
import Step1 from './onboarding/Step1';
import Step2 from './onboarding/Step2';
import Step3 from './onboarding/Step3';

interface OnboardingWizardProps {
  user: User;
  config: OnboardingConfig;
  onUserUpdate: (user: User) => void;
  onStartNew: () => void;
}

export default function OnboardingWizard({ user, config, onUserUpdate, onStartNew }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(user.currentStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStepComplete = async (stepData: UpdateUserRequest) => {
    setIsSubmitting(true);
    try {
      const nextStep = currentStep + 1;
      const updatedUser = await userApi.updateUser(user.email, {
        ...stepData,
        currentStep: nextStep
      });
      onUserUpdate(updatedUser.user);
      
      if (nextStep > 3) {
        // Onboarding is complete
        setIsCompleted(true);
      } else {
        setCurrentStep(nextStep);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    if (isCompleted) {
      return (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Onboarding Complete!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for completing the onboarding process. Your account has been set up successfully.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <p>Email: <span className="font-medium text-gray-900">{user.email}</span></p>
              <p>Completed on: <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span></p>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                onClick={onStartNew}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start New Onboarding
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1
            user={user}
            onComplete={handleStepComplete}
            isSubmitting={isSubmitting}
          />
        );
      case 2:
        return (
          <Step2
            user={user}
            config={config}
            onComplete={handleStepComplete}
            onPrevious={handlePreviousStep}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return (
          <Step3
            user={user}
            config={config}
            onComplete={handleStepComplete}
            onPrevious={handlePreviousStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar - Only show if not completed */}
      {!isCompleted && (
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of 3
                </div>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </div>
    </div>
  );
}
