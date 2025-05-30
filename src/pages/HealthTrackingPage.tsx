import React from 'react';
import HealthTracker from '../components/health/HealthTracker';

const HealthTrackingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
        Health Tracking
      </h1>
      <p className="text-gray-600 mb-8">
        Monitor your vital health metrics over time and track your progress toward your health goals.
      </p>
      
      <HealthTracker />
    </div>
  );
};

export default HealthTrackingPage;