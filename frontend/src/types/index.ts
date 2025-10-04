export interface User {
  _id: string;
  email: string;
  aboutMe?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  birthdate?: string;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingConfig {
  _id: string;
  page2Components: Array<{
    type: 'aboutMe' | 'address' | 'birthdate';
    order: number;
  }>;
  page3Components: Array<{
    type: 'aboutMe' | 'address' | 'birthdate';
    order: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  aboutMe?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  birthdate?: string;
  currentStep?: number;
}

export type ComponentType = 'aboutMe' | 'address' | 'birthdate';

export interface ComponentConfig {
  type: ComponentType;
  order: number;
}
