import React, { useState } from 'react';
import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { SymptomCheckerResult } from '../../types';

// Mock symptom options
const symptomOptions = [
  'Headache', 'Fever', 'Cough', 'Sore Throat', 'Fatigue',
  'Shortness of Breath', 'Nausea', 'Dizziness', 'Chest Pain',
  'Abdominal Pain', 'Muscle Aches', 'Joint Pain', 'Rash',
  'Vomiting', 'Diarrhea', 'Chills', 'Loss of Appetite',
  'Runny Nose', 'Congestion', 'Loss of Taste or Smell'
];

// Mock severity options
const severityOptions = ['Mild', 'Moderate', 'Severe'];

// Mock duration options
const durationOptions = [
  'Less than a day',
  '1-3 days',
  '4-7 days',
  '1-2 weeks',
  'More than 2 weeks'
];

// Mock results for demonstration
const mockResults: SymptomCheckerResult = {
  possibleConditions: [
    {
      name: 'Common Cold',
      probability: 75,
      severity: 'low',
      description: 'A mild viral infection of the nose and throat.',
      recommendations: [
        'Rest and stay hydrated',
        'Over-the-counter cold medications may help relieve symptoms',
        'Use a humidifier to ease congestion'
      ]
    },
    {
      name: 'Seasonal Allergies',
      probability: 60,
      severity: 'low',
      description: 'An immune system response triggered by exposure to allergens.',
      recommendations: [
        'Over-the-counter antihistamines',
        'Avoid known allergens',
        'Consider using a HEPA filter in your home'
      ]
    },
    {
      name: 'Influenza',
      probability: 30,
      severity: 'medium',
      description: 'A contagious respiratory illness caused by influenza viruses.',
      recommendations: [
        'Rest and stay hydrated',
        'Over-the-counter pain relievers may help reduce fever and discomfort',
        'Consult your healthcare provider about antiviral medications'
      ]
    }
  ],
  urgencyLevel: 'non-urgent',
  generalAdvice: 'Based on your symptoms, your condition appears to be non-urgent. Monitor your symptoms and rest. If symptoms worsen or new symptoms develop, please consult with a healthcare provider.',
  disclaimer: 'This assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.'
};

const SymptomChecker: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [results, setResults] = useState<SymptomCheckerResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setSeverity('');
    setDuration('');
    setResults(null);
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select your symptoms</h2>
            <p className="text-gray-600 mb-6">Choose all symptoms you're currently experiencing:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {symptomOptions.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-primary-100 border-primary-300 border text-primary-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <div></div>
              <Button
                onClick={handleNext}
                disabled={selectedSymptoms.length === 0}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How severe are your symptoms?</h2>
            <div className="space-y-3 mb-6">
              {severityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSeverity(option)}
                  className={`p-4 rounded-lg text-left w-full transition-colors ${
                    severity === option
                      ? 'bg-primary-100 border-primary-300 border text-primary-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!severity}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How long have you had these symptoms?</h2>
            <div className="space-y-3 mb-6">
              {durationOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setDuration(option)}
                  className={`p-4 rounded-lg text-left w-full transition-colors ${
                    duration === option
                      ? 'bg-primary-100 border-primary-300 border text-primary-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!duration}
                isLoading={loading}
              >
                Get Results
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Assessment Results</h2>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={handleReset}
              >
                New Check
              </Button>
            </div>
            
            {results && (
              <>
                <div className={`p-4 rounded-lg mb-6 ${
                  results.urgencyLevel === 'emergency' 
                    ? 'bg-error-50 text-error-800' 
                    : results.urgencyLevel === 'urgent'
                      ? 'bg-warning-50 text-warning-800'
                      : 'bg-primary-50 text-primary-800'
                }`}>
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {results.urgencyLevel === 'emergency' 
                          ? 'Seek emergency care immediately' 
                          : results.urgencyLevel === 'urgent'
                            ? 'Urgent care recommended'
                            : results.urgencyLevel === 'moderate'
                              ? 'Consider contacting your healthcare provider'
                              : 'Non-urgent condition'
                        }
                      </p>
                      <p className="text-sm mt-1">{results.generalAdvice}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-3">Possible conditions:</h3>
                <div className="space-y-4 mb-6">
                  {results.possibleConditions.map((condition, index) => (
                    <Card key={index} className="overflow-hidden border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{condition.name}</h4>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Match:</span>
                          <div className="bg-gray-200 w-24 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                condition.probability > 70 
                                  ? 'bg-success-500' 
                                  : condition.probability > 40 
                                    ? 'bg-warning-500' 
                                    : 'bg-error-500'
                              }`}
                              style={{ width: `${condition.probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Recommendations:</h5>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                          {condition.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 italic mt-6 p-3 bg-gray-50 rounded border border-gray-200">
                  {results.disclaimer}
                </div>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900">AI Symptom Checker</h1>
          <div className="flex items-center">
            {step < 4 && (
              <div className="text-sm text-gray-500">
                Step {step} of 3
              </div>
            )}
          </div>
        </div>
        
        {step < 4 && (
          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {renderStepContent()}
    </motion.div>
  );
};

export default SymptomChecker;