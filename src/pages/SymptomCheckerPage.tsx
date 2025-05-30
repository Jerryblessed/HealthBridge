import React from 'react';
import SymptomChecker from '../components/health/SymptomChecker';

const SymptomCheckerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
        AI Symptom Checker
      </h1>
      <p className="text-gray-600 mb-8">
        Use our AI-powered tool to check your symptoms and get personalized health insights.
      </p>
      
      <SymptomChecker />
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Important Disclaimer</h2>
        <p className="text-sm text-gray-600">
          This symptom checker is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always seek the advice of your physician or other qualified health provider with any questions you 
          may have regarding a medical condition. Never disregard professional medical advice or delay in seeking 
          it because of something you have read on this website.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          If you think you may have a medical emergency, call your doctor or emergency services immediately.
        </p>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;