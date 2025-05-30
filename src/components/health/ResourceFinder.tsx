import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Search, Phone, Globe, Mail, Star, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ResourceItem } from '../../types';

// Mock resources data
const mockResources: ResourceItem[] = [
  {
    id: '1',
    name: 'Community Health Center',
    category: 'medical',
    description: 'Provides comprehensive primary healthcare services to everyone, regardless of ability to pay.',
    contact: {
      phone: '(555) 123-4567',
      email: 'info@communityhealthcenter.org',
      website: 'www.communityhealthcenter.org',
    },
    address: {
      street: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    distance: 1.2,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '8:00 AM - 6:00 PM',
    },
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Mental Health Support Group',
    category: 'mental health',
    description: 'Weekly support group for individuals dealing with anxiety and depression.',
    contact: {
      phone: '(555) 234-5678',
      email: 'support@mhsupportgroup.org',
      website: 'www.mentalhealthsupport.org',
    },
    address: {
      street: '456 Oak Avenue',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    distance: 2.5,
    availability: {
      days: ['Monday', 'Wednesday'],
      hours: '6:00 PM - 8:00 PM',
    },
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Downtown Pharmacy',
    category: 'pharmacy',
    description: 'Full-service pharmacy with prescription services, immunizations, and health consultations.',
    contact: {
      phone: '(555) 345-6789',
      email: 'info@downtownpharmacy.com',
      website: 'www.downtownpharmacy.com',
    },
    address: {
      street: '789 Elm Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    distance: 0.8,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 9:00 PM',
    },
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Wellness Center',
    category: 'fitness',
    description: 'Offers yoga, meditation, and fitness classes for all ages and abilities.',
    contact: {
      phone: '(555) 456-7890',
      email: 'info@wellnesscenter.org',
      website: 'www.wellnesscenter.org',
    },
    address: {
      street: '101 Pine Street',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    distance: 1.5,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '6:00 AM - 10:00 PM',
    },
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Nutrition Counseling Center',
    category: 'nutrition',
    description: 'Personalized nutrition counseling and education for various health conditions.',
    contact: {
      phone: '(555) 567-8901',
      email: 'appointments@nutritioncenter.org',
      website: 'www.nutritioncounseling.org',
    },
    address: {
      street: '222 Maple Drive',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
    distance: 3.0,
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      hours: '9:00 AM - 5:00 PM',
    },
    rating: 4.4,
  },
];

const ResourceFinder: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [isLoading, setIsLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  useEffect(() => {
    // Simulate loading resources
    setTimeout(() => {
      setResources(mockResources);
      setIsLoading(false);
    }, 1000);
  }, []);

  const requestLocationPermission = () => {
    // Simulate location permission request
    setTimeout(() => {
      setLocationPermission('granted');
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search parameters
    console.log('Searching for:', searchQuery);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSortChange = (sort: 'distance' | 'rating') => {
    setSortBy(sort);
  };

  const filteredResources = resources
    .filter(resource => 
      (searchQuery === '' || 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === '' || resource.category === selectedCategory)
    )
    .sort((a, b) => 
      sortBy === 'distance' 
        ? (a.distance || 0) - (b.distance || 0)
        : (b.rating || 0) - (a.rating || 0)
    );

  const categoryOptions = [
    { value: 'medical', label: 'Medical Services' },
    { value: 'mental health', label: 'Mental Health' },
    { value: 'pharmacy', label: 'Pharmacies' },
    { value: 'support group', label: 'Support Groups' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-4 md:mb-0">Community Health Resources</h1>
          
          {locationPermission !== 'granted' && (
            <div className="bg-primary-50 p-3 rounded-lg flex items-center">
              <MapPin className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-primary-700 mr-3">Enable location for nearby resources</span>
              <Button size="sm" onClick={requestLocationPermission}>
                Enable
              </Button>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          {categoryOptions.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === category.value
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                {sortBy === 'distance' ? 'Nearest' : 'Highest Rated'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className={`block px-4 py-2 text-sm ${sortBy === 'distance' ? 'text-primary-500 font-medium' : 'text-gray-700'} w-full text-left`}
                  onClick={() => handleSortChange('distance')}
                >
                  Nearest
                </button>
                <button
                  className={`block px-4 py-2 text-sm ${sortBy === 'rating' ? 'text-primary-500 font-medium' : 'text-gray-700'} w-full text-left`}
                  onClick={() => handleSortChange('rating')}
                >
                  Highest Rated
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">No resources found matching your criteria.</p>
            <Button className="mt-4" onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-medium text-gray-900">{resource.name}</h2>
                      <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800">
                        {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
                        <ul className="space-y-2">
                          {resource.contact.phone && (
                            <li className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <a href={`tel:${resource.contact.phone}`} className="hover:text-primary-500">
                                {resource.contact.phone}
                              </a>
                            </li>
                          )}
                          {resource.contact.email && (
                            <li className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <a href={`mailto:${resource.contact.email}`} className="hover:text-primary-500">
                                {resource.contact.email}
                              </a>
                            </li>
                          )}
                          {resource.contact.website && (
                            <li className="flex items-center text-sm text-gray-600">
                              <Globe className="h-4 w-4 text-gray-400 mr-2" />
                              <a href={`https://${resource.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">
                                {resource.contact.website}
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Location & Hours</h3>
                        <div className="flex items-start text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                          <div>
                            {resource.address?.street}, {resource.address?.city}, {resource.address?.state}
                            <div className="mt-1 text-primary-600 font-medium">
                              {resource.distance} miles away
                            </div>
                          </div>
                        </div>
                        {resource.availability && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{resource.availability.days.join(', ')}</span>
                            <div>{resource.availability.hours}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:ml-6 md:w-40 flex flex-col items-center mt-4 md:mt-0">
                    {resource.rating && (
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="font-medium">{resource.rating}/5</span>
                      </div>
                    )}
                    <Button variant="primary" className="w-full mb-2">
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResourceFinder;