export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    language: string;
    notifications: boolean;
    accessibility: {
      highContrast: boolean;
      fontSize: 'small' | 'medium' | 'large';
      reduceMotion: boolean;
    };
  };
}

export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
  target?: {
    min?: number;
    max?: number;
  };
}

export interface SymptomCheckerResult {
  possibleConditions: Array<{
    name: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendations: string[];
  }>;
  urgencyLevel: 'non-urgent' | 'moderate' | 'urgent' | 'emergency';
  generalAdvice: string;
  disclaimer: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'medical' | 'mental health' | 'pharmacy' | 'support group' | 'fitness' | 'nutrition';
  description: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  distance?: number; // in kilometers/miles
  availability?: {
    days: string[];
    hours: string;
  };
  rating?: number;
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi' | 'ar';

export interface MentalHealthCheck {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  stress: 1 | 2 | 3 | 4 | 5;
  sleep: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}