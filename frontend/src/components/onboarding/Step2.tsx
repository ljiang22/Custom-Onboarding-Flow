'use client';

import { useState } from 'react';
import { User, OnboardingConfig, ComponentType, UpdateUserRequest } from '../../types';
import AboutMeComponent from './components/AboutMeComponent';
import AddressComponent from './components/AddressComponent';
import BirthdateComponent from './components/BirthdateComponent';

interface Step2Props {
  user: User;
  config: OnboardingConfig;
  onComplete: (data: UpdateUserRequest) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export default function Step2({ user, config, onComplete, onPrevious, isSubmitting }: Step2Props) {
  const [formData, setFormData] = useState({
    aboutMe: user.aboutMe || '',
    address: user.address || {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    birthdate: user.birthdate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const renderComponent = (componentType: ComponentType, order: number) => {
    switch (componentType) {
      case 'aboutMe':
        return (
          <AboutMeComponent
            key={`aboutMe-${order}`}
            value={formData.aboutMe}
            onChange={(value) => setFormData({ ...formData, aboutMe: value })}
          />
        );
      case 'address':
        return (
          <AddressComponent
            key={`address-${order}`}
            value={formData.address}
            onChange={(value) => setFormData({ ...formData, address: value })}
          />
        );
      case 'birthdate':
        return (
          <BirthdateComponent
            key={`birthdate-${order}`}
            value={formData.birthdate}
            onChange={(value) => setFormData({ ...formData, birthdate: value })}
          />
        );
      default:
        return null;
    }
  };

  // Sort components by order
  const sortedComponents = [...config.page2Components].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tell Us About Yourself</h2>
        <p className="mt-2 text-gray-600">
          Please provide the following information to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sortedComponents.map((component) => 
          renderComponent(component.type, component.order)
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
