import React from 'react';
import MentalWellnessCheck from '../components/health/MentalWellnessCheck';

const MentalWellnessPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
        Mental Wellness
      </h1>
      <p className="text-gray-600 mb-8">
        Track your mental well-being, identify patterns, and access supportive resources.
      </p>
      
      <MentalWellnessCheck />
    </div>
  );
};

export default MentalWellnessPage;