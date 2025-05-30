import React from 'react';
import ResourceFinder from '../components/health/ResourceFinder';

const ResourcesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
        Community Health Resources
      </h1>
      <p className="text-gray-600 mb-8">
        Find healthcare resources, support groups, and wellness services near you.
      </p>
      
      <ResourceFinder />
    </div>
  );
};

export default ResourcesPage;