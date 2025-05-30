import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, TrendingUp, Heart, Smile, Frown, Meh, Moon } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { MentalHealthCheck } from '../../types';

// Mock data for mental health check history
const mockChecks: MentalHealthCheck[] = [
  { id: '1', date: '2023-07-01', mood: 3, stress: 4, sleep: 2, notes: 'Feeling a bit overwhelmed today.' },
  { id: '2', date: '2023-07-02', mood: 4, stress: 3, sleep: 3, notes: 'Better day, got some exercise.' },
  { id: '3', date: '2023-07-03', mood: 4, stress: 2, sleep: 4, notes: 'Productive day, feeling good.' },
  { id: '4', date: '2023-07-04', mood: 5, stress: 2, sleep: 4, notes: 'Great day with family.' },
  { id: '5', date: '2023-07-05', mood: 4, stress: 3, sleep: 3, notes: 'Back to work, a bit tired.' },
  { id: '6', date: '2023-07-06', mood: 3, stress: 4, sleep: 2, notes: 'Busy day, feeling stressed.' },
  { id: '7', date: '2023-07-07', mood: 2, stress: 5, sleep: 1, notes: 'Very stressful day, poor sleep.' },
];

const MentalWellnessCheck: React.FC = () => {
  const [checkHistory, setCheckHistory] = useState<MentalHealthCheck[]>(mockChecks);
  const [currentCheck, setCurrentCheck] = useState<Partial<MentalHealthCheck>>({
    mood: undefined,
    stress: undefined,
    sleep: undefined,
    notes: '',
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleMoodSelection = (mood: 1 | 2 | 3 | 4 | 5) => {
    setCurrentCheck({ ...currentCheck, mood });
    nextStep();
  };

  const handleStressSelection = (stress: 1 | 2 | 3 | 4 | 5) => {
    setCurrentCheck({ ...currentCheck, stress });
    nextStep();
  };

  const handleSleepSelection = (sleep: 1 | 2 | 3 | 4 | 5) => {
    setCurrentCheck({ ...currentCheck, sleep });
    nextStep();
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCheck({ ...currentCheck, notes: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCheck: MentalHealthCheck = {
        id: `${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        mood: currentCheck.mood as 1 | 2 | 3 | 4 | 5,
        stress: currentCheck.stress as 1 | 2 | 3 | 4 | 5,
        sleep: currentCheck.sleep as 1 | 2 | 3 | 4 | 5,
        notes: currentCheck.notes,
      };
      
      setCheckHistory([newCheck, ...checkHistory]);
      setCurrentCheck({
        mood: undefined,
        stress: undefined,
        sleep: undefined,
        notes: '',
      });
      setStep(1);
      setSubmitting(false);
    }, 1000);
  };

  // Calculate averages for the dashboard
  const calculateAverages = () => {
    if (checkHistory.length === 0) return { mood: 0, stress: 0, sleep: 0 };
    
    const totals = checkHistory.reduce(
      (acc, check) => ({
        mood: acc.mood + check.mood,
        stress: acc.stress + check.stress,
        sleep: acc.sleep + check.sleep,
      }),
      { mood: 0, stress: 0, sleep: 0 }
    );
    
    return {
      mood: +(totals.mood / checkHistory.length).toFixed(1),
      stress: +(totals.stress / checkHistory.length).toFixed(1),
      sleep: +(totals.sleep / checkHistory.length).toFixed(1),
    };
  };

  const averages = calculateAverages();

  // Helper function to get emoji and text for ratings
  const getMoodInfo = (rating: number) => {
    switch(rating) {
      case 1: return { icon: <Frown className="w-6 h-6" />, text: 'Very Low', color: 'error' };
      case 2: return { icon: <Frown className="w-6 h-6" />, text: 'Low', color: 'warning' };
      case 3: return { icon: <Meh className="w-6 h-6" />, text: 'Neutral', color: 'primary' };
      case 4: return { icon: <Smile className="w-6 h-6" />, text: 'Good', color: 'success' };
      case 5: return { icon: <Smile className="w-6 h-6" />, text: 'Excellent', color: 'success' };
      default: return { icon: <Meh className="w-6 h-6" />, text: 'Not Rated', color: 'primary' };
    }
  };

  const getStressInfo = (rating: number) => {
    // For stress, higher is worse
    switch(rating) {
      case 1: return { text: 'Very Low', color: 'success' };
      case 2: return { text: 'Low', color: 'success' };
      case 3: return { text: 'Moderate', color: 'primary' };
      case 4: return { text: 'High', color: 'warning' };
      case 5: return { text: 'Very High', color: 'error' };
      default: return { text: 'Not Rated', color: 'primary' };
    }
  };

  const getSleepInfo = (rating: number) => {
    switch(rating) {
      case 1: return { text: 'Very Poor', color: 'error' };
      case 2: return { text: 'Poor', color: 'warning' };
      case 3: return { text: 'Fair', color: 'primary' };
      case 4: return { text: 'Good', color: 'success' };
      case 5: return { text: 'Excellent', color: 'success' };
      default: return { text: 'Not Rated', color: 'primary' };
    }
  };

  const renderCheckStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">How are you feeling today?</h2>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleMoodSelection(rating as 1 | 2 | 3 | 4 | 5)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                    currentCheck.mood === rating
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${
                    rating <= 2 
                      ? 'text-error-500' 
                      : rating === 3 
                        ? 'text-primary-500' 
                        : 'text-success-500'
                  }`}>
                    {rating <= 2 ? '😔' : rating === 3 ? '😐' : '😊'}
                  </div>
                  <span className="text-sm text-gray-700">
                    {rating === 1 ? 'Very Bad' : 
                     rating === 2 ? 'Bad' : 
                     rating === 3 ? 'Okay' : 
                     rating === 4 ? 'Good' : 'Great'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">How stressed do you feel?</h2>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleStressSelection(rating as 1 | 2 | 3 | 4 | 5)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                    currentCheck.stress === rating
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${
                    rating <= 2 
                      ? 'text-success-500' 
                      : rating === 3 
                        ? 'text-primary-500' 
                        : 'text-error-500'
                  }`}>
                    {rating <= 2 ? '😌' : rating === 3 ? '😐' : '😰'}
                  </div>
                  <span className="text-sm text-gray-700">
                    {rating === 1 ? 'None' : 
                     rating === 2 ? 'Little' : 
                     rating === 3 ? 'Moderate' : 
                     rating === 4 ? 'High' : 'Extreme'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">How well did you sleep?</h2>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSleepSelection(rating as 1 | 2 | 3 | 4 | 5)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                    currentCheck.sleep === rating
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${
                    rating <= 2 
                      ? 'text-error-500' 
                      : rating === 3 
                        ? 'text-primary-500' 
                        : 'text-success-500'
                  }`}>
                    {rating <= 2 ? '😴❌' : rating === 3 ? '😴' : '😴✅'}
                  </div>
                  <span className="text-sm text-gray-700">
                    {rating === 1 ? 'Very Poor' : 
                     rating === 2 ? 'Poor' : 
                     rating === 3 ? 'Fair' : 
                     rating === 4 ? 'Good' : 'Excellent'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Any notes about today?</h2>
            <p className="text-gray-600 mb-4">Optional: Add any thoughts or context about how you're feeling.</p>
            <textarea
              value={currentCheck.notes}
              onChange={handleNotesChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32"
              placeholder="Enter any notes about your day..."
            ></textarea>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit} isLoading={submitting}>
                Submit Check-in
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Daily Mental Wellness Check" icon={<Heart className="h-5 w-5" />}>
            <div className="mb-6">
              <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
              
              {step < 4 && (
                <div className="flex justify-between mb-6">
                  <Button variant="outline" size="sm" onClick={prevStep} disabled={step === 1}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <span className="text-sm text-gray-500">Step {step} of 4</span>
                  {step < 4 && (
                    <Button variant="outline" size="sm" onClick={nextStep} disabled={
                      (step === 1 && currentCheck.mood === undefined) ||
                      (step === 2 && currentCheck.stress === undefined) ||
                      (step === 3 && currentCheck.sleep === undefined)
                    }>
                      Skip
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {renderCheckStep()}
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Your Wellness Dashboard" icon={<TrendingUp className="h-5 w-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-primary-800">Average Mood</h3>
                  <Smile className="h-5 w-5 text-primary-500" />
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary-800">{averages.mood}</span>
                  <span className="text-sm text-primary-600 ml-1">/5</span>
                </div>
                <ProgressBar value={averages.mood} max={5} color="primary" size="sm" className="mt-2" />
              </div>
              
              <div className="bg-accent-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-accent-800">Average Stress</h3>
                  <Meh className="h-5 w-5 text-accent-500" />
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-accent-800">{averages.stress}</span>
                  <span className="text-sm text-accent-600 ml-1">/5</span>
                </div>
                <ProgressBar value={averages.stress} max={5} color="accent" size="sm" className="mt-2" />
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-secondary-800">Average Sleep</h3>
                  <Moon className="h-5 w-5 text-secondary-500" />
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-secondary-800">{averages.sleep}</span>
                  <span className="text-sm text-secondary-600 ml-1">/5</span>
                </div>
                <ProgressBar value={averages.sleep} max={5} color="secondary" size="sm" className="mt-2" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Check-ins</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last 7 days
                </div>
              </div>
              
              {checkHistory.length > 0 ? (
                <div className="space-y-4">
                  {checkHistory.map((check) => (
                    <motion.div
                      key={check.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium text-gray-500">
                          {new Date(check.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            check.mood >= 4 ? 'bg-success-100 text-success-700' :
                            check.mood <= 2 ? 'bg-error-100 text-error-700' :
                            'bg-primary-100 text-primary-700'
                          }`}>
                            <Smile className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Mood</div>
                            <div className="text-sm font-medium">{getMoodInfo(check.mood).text}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            check.stress <= 2 ? 'bg-success-100 text-success-700' :
                            check.stress >= 4 ? 'bg-error-100 text-error-700' :
                            'bg-primary-100 text-primary-700'
                          }`}>
                            <Meh className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Stress</div>
                            <div className="text-sm font-medium">{getStressInfo(check.stress).text}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            check.sleep >= 4 ? 'bg-success-100 text-success-700' :
                            check.sleep <= 2 ? 'bg-error-100 text-error-700' :
                            'bg-primary-100 text-primary-700'
                          }`}>
                            <Moon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Sleep</div>
                            <div className="text-sm font-medium">{getSleepInfo(check.sleep).text}</div>
                          </div>
                        </div>
                      </div>
                      
                      {check.notes && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                          {check.notes}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No check-ins recorded yet.</p>
                  <p className="text-sm mt-2">Complete your first wellness check to start tracking!</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessCheck;