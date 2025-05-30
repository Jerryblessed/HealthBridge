import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, Search, Bell, MapPin, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useUser();

  const upcomingAppointments = [
    {
      id: '1',
      title: 'Annual Physical',
      doctor: 'Dr. Sarah Johnson',
      location: 'Community Health Center',
      date: '2023-08-15',
      time: '10:00 AM',
    },
    {
      id: '2',
      title: 'Dental Checkup',
      doctor: 'Dr. Michael Chen',
      location: 'Bright Smile Dental',
      date: '2023-08-22',
      time: '2:30 PM',
    },
  ];

  const healthMetrics = [
    { name: 'Heart Rate', value: 72, unit: 'bpm', icon: <Heart className="h-5 w-5" />, status: 'normal' },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: <Activity className="h-5 w-5" />, status: 'normal' },
    { name: 'Sleep', value: 7.5, unit: 'hours', icon: <Brain className="h-5 w-5" />, status: 'good' },
    { name: 'Steps', value: 8420, unit: 'steps', icon: <Activity className="h-5 w-5" />, status: 'good' },
  ];

  const recentResources = [
    {
      id: '1',
      name: 'Community Health Clinic',
      category: 'Medical',
      distance: 1.2,
    },
    {
      id: '2',
      name: 'Mental Health Support Group',
      category: 'Mental Health',
      distance: 2.5,
    },
    {
      id: '3',
      name: 'Downtown Pharmacy',
      category: 'Pharmacy',
      distance: 0.8,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Welcome to HealthBridge'}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your AI-powered health companion for better community wellbeing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          className="md:col-span-2 bg-primary-50 border border-primary-100" 
          isInteractive 
          onClick={() => window.location.href = '/symptom-checker'}
        >
          <div className="flex items-start">
            <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
              <Search className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-primary-900 mb-2">
                AI Symptom Checker
              </h2>
              <p className="text-primary-700 mb-4">
                Describe your symptoms and get AI-powered insights about possible conditions and next steps.
              </p>
              <Button variant="primary">
                Check Symptoms
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100" isInteractive onClick={() => window.location.href = '/mental-wellness'}>
          <div className="flex items-start">
            <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
              <Brain className="h-6 w-6 text-secondary-500" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-secondary-900 mb-2">
                Mental Wellness
              </h2>
              <p className="text-secondary-700 mb-4">
                Track your mental health and get personalized support.
              </p>
              <Button variant="secondary">
                Daily Check-in
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card title="Health Metrics" icon={<Heart className="h-5 w-5" />} className="h-full" footer={
            <div className="text-center">
              <Button variant="outline\" onClick={() => window.location.href = '/health-tracking'} isFullWidth>
                View All Metrics
              </Button>
            </div>
          }>
            <div className="space-y-4">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      metric.status === 'normal' ? 'bg-primary-100 text-primary-700' :
                      metric.status === 'good' ? 'bg-success-100 text-success-700' :
                      'bg-warning-100 text-warning-700'
                    }`}>
                      {metric.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{metric.name}</div>
                      <div className="text-sm text-gray-500">
                        {metric.value} {metric.unit}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.status === 'normal' ? 'bg-primary-100 text-primary-800' :
                    metric.status === 'good' ? 'bg-success-100 text-success-800' :
                    'bg-warning-100 text-warning-800'
                  }`}>
                    {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title="Upcoming Appointments" icon={<Calendar className="h-5 w-5" />} className="h-full" footer={
            <div className="text-center">
              <Button variant="outline\" isFullWidth>
                Schedule New Appointment
              </Button>
            </div>
          }>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                      <div className="text-sm text-primary-600 font-medium">
                        {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {appointment.doctor}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {appointment.location}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.time}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No upcoming appointments</p>
                <Button className="mt-4">Schedule Appointment</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title="Nearby Resources" icon={<MapPin className="h-5 w-5" />} className="h-full" footer={
            <div className="text-center">
              <Button variant="outline\" onClick={() => window.location.href = '/resources'} isFullWidth>
                Find More Resources
              </Button>
            </div>
          }>
            <div className="space-y-3">
              {recentResources.map((resource) => (
                <div key={resource.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{resource.name}</h3>
                    <div className="text-sm text-primary-600">
                      {resource.distance} mi
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {resource.category}
                    </div>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Your Health Goals" icon={<Activity className="h-5 w-5" />} footer={
          <div className="text-center">
            <Button variant="outline\" isFullWidth>
              Manage Goals
            </Button>
          </div>
        }>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <div className="font-medium text-gray-900">Daily Step Goal</div>
                <div className="text-sm text-gray-500">8,420 / 10,000 steps</div>
              </div>
              <ProgressBar value={8420} max={10000} color="primary" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div className="font-medium text-gray-900">Weekly Exercise</div>
                <div className="text-sm text-gray-500">3 / 5 days</div>
              </div>
              <ProgressBar value={3} max={5} color="accent" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div className="font-medium text-gray-900">Water Intake</div>
                <div className="text-sm text-gray-500">5 / 8 glasses</div>
              </div>
              <ProgressBar value={5} max={8} color="secondary" />
            </div>
          </div>
        </Card>

        <Card title="Health Notifications" icon={<Bell className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="p-3 bg-success-50 border border-success-100 rounded-lg flex items-start">
              <div className="p-2 bg-success-100 rounded-full mr-3">
                <Activity className="h-5 w-5 text-success-700" />
              </div>
              <div>
                <h3 className="font-medium text-success-900">Exercise Goal Met</h3>
                <p className="text-sm text-success-700">
                  Congratulations! You've reached your step goal 3 days in a row.
                </p>
                <p className="text-xs text-success-600 mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-primary-50 border border-primary-100 rounded-lg flex items-start">
              <div className="p-2 bg-primary-100 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-primary-700" />
              </div>
              <div>
                <h3 className="font-medium text-primary-900">Appointment Reminder</h3>
                <p className="text-sm text-primary-700">
                  Your annual physical with Dr. Sarah Johnson is scheduled for August 15.
                </p>
                <p className="text-xs text-primary-600 mt-1">
                  1 day ago
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-start">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Brain className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mental Wellness Reminder</h3>
                <p className="text-sm text-gray-700">
                  Don't forget your daily mental wellness check-in.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  3 days ago
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;