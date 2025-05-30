import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, Plus, Edit2, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { HealthMetric } from '../../types';

// Mock health metrics data
const initialMetrics: HealthMetric[] = [
  { id: '1', name: 'Heart Rate', value: 72, unit: 'bpm', date: '2023-07-01', target: { min: 60, max: 100 } },
  { id: '2', name: 'Heart Rate', value: 75, unit: 'bpm', date: '2023-07-02', target: { min: 60, max: 100 } },
  { id: '3', name: 'Heart Rate', value: 70, unit: 'bpm', date: '2023-07-03', target: { min: 60, max: 100 } },
  { id: '4', name: 'Heart Rate', value: 68, unit: 'bpm', date: '2023-07-04', target: { min: 60, max: 100 } },
  { id: '5', name: 'Heart Rate', value: 71, unit: 'bpm', date: '2023-07-05', target: { min: 60, max: 100 } },
  { id: '6', name: 'Heart Rate', value: 73, unit: 'bpm', date: '2023-07-06', target: { min: 60, max: 100 } },
  { id: '7', name: 'Heart Rate', value: 69, unit: 'bpm', date: '2023-07-07', target: { min: 60, max: 100 } },
  
  { id: '8', name: 'Blood Pressure', value: 120, unit: 'mmHg', date: '2023-07-01', target: { max: 140 } },
  { id: '9', name: 'Blood Pressure', value: 122, unit: 'mmHg', date: '2023-07-02', target: { max: 140 } },
  { id: '10', name: 'Blood Pressure', value: 118, unit: 'mmHg', date: '2023-07-03', target: { max: 140 } },
  { id: '11', name: 'Blood Pressure', value: 121, unit: 'mmHg', date: '2023-07-04', target: { max: 140 } },
  { id: '12', name: 'Blood Pressure', value: 119, unit: 'mmHg', date: '2023-07-05', target: { max: 140 } },
  { id: '13', name: 'Blood Pressure', value: 123, unit: 'mmHg', date: '2023-07-06', target: { max: 140 } },
  { id: '14', name: 'Blood Pressure', value: 120, unit: 'mmHg', date: '2023-07-07', target: { max: 140 } },
  
  { id: '15', name: 'Weight', value: 165, unit: 'lbs', date: '2023-07-01', target: { min: 150, max: 170 } },
  { id: '16', name: 'Weight', value: 164, unit: 'lbs', date: '2023-07-03', target: { min: 150, max: 170 } },
  { id: '17', name: 'Weight', value: 163, unit: 'lbs', date: '2023-07-05', target: { min: 150, max: 170 } },
  { id: '18', name: 'Weight', value: 162, unit: 'lbs', date: '2023-07-07', target: { min: 150, max: 170 } },
];

const metricTypes = [
  { id: 'heart-rate', name: 'Heart Rate', unit: 'bpm', icon: <Heart className="h-5 w-5" /> },
  { id: 'blood-pressure', name: 'Blood Pressure', unit: 'mmHg', icon: <Activity className="h-5 w-5" /> },
  { id: 'weight', name: 'Weight', unit: 'lbs', icon: <TrendingUp className="h-5 w-5" /> },
  { id: 'steps', name: 'Steps', unit: 'steps', icon: <Activity className="h-5 w-5" /> },
  { id: 'blood-sugar', name: 'Blood Sugar', unit: 'mg/dL', icon: <TrendingUp className="h-5 w-5" /> },
  { id: 'temperature', name: 'Temperature', unit: '°F', icon: <TrendingUp className="h-5 w-5" /> },
];

const HealthTracker: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>(initialMetrics);
  const [selectedMetricType, setSelectedMetricType] = useState('Heart Rate');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMetric, setNewMetric] = useState<Partial<HealthMetric>>({
    name: 'Heart Rate',
    value: '',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredMetrics = metrics
    .filter(metric => metric.name === selectedMetricType)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleMetricTypeChange = (metricType: string) => {
    setSelectedMetricType(metricType);
    setNewMetric({ ...newMetric, name: metricType });
  };

  const handleAddMetric = () => {
    if (!newMetric.name || !newMetric.value || !newMetric.date) return;
    
    const selectedType = metricTypes.find(type => type.name === newMetric.name);
    
    const newMetricItem: HealthMetric = {
      id: `${Date.now()}`,
      name: newMetric.name || '',
      value: Number(newMetric.value),
      unit: selectedType?.unit || '',
      date: newMetric.date || new Date().toISOString().split('T')[0],
      target: getDefaultTarget(newMetric.name || ''),
    };
    
    setMetrics([...metrics, newMetricItem]);
    setNewMetric({
      name: selectedMetricType,
      value: '',
      date: new Date().toISOString().split('T')[0],
    });
    setShowAddForm(false);
  };

  const handleDeleteMetric = (id: string) => {
    setMetrics(metrics.filter(metric => metric.id !== id));
  };

  const getDefaultTarget = (metricName: string) => {
    switch(metricName) {
      case 'Heart Rate':
        return { min: 60, max: 100 };
      case 'Blood Pressure':
        return { max: 140 };
      case 'Weight':
        return { min: 150, max: 170 };
      case 'Steps':
        return { min: 8000 };
      case 'Blood Sugar':
        return { min: 70, max: 140 };
      case 'Temperature':
        return { min: 97, max: 99 };
      default:
        return {};
    }
  };

  const getLatestMetricValue = (metricName: string) => {
    const filtered = metrics
      .filter(metric => metric.name === metricName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return filtered.length > 0 ? filtered[0] : null;
  };

  // Format data for chart
  const chartData = filteredMetrics.map(metric => ({
    date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: metric.value,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Health Metrics" icon={<Heart className="h-5 w-5" />}>
            <div className="space-y-4">
              {metricTypes.map((type) => {
                const latestValue = getLatestMetricValue(type.name);
                
                return (
                  <button
                    key={type.id}
                    onClick={() => handleMetricTypeChange(type.name)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                      selectedMetricType === type.name
                        ? 'bg-primary-50 border border-primary-100'
                        : 'hover:bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        selectedMetricType === type.name
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{type.name}</div>
                        {latestValue && (
                          <div className="text-sm text-gray-500">
                            Last: {latestValue.value} {type.unit}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </button>
                );
              })}
              
              <Button
                variant="outline"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => setShowAddForm(true)}
                className="w-full mt-4"
              >
                Add New Measurement
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedMetricType} Tracking
              </h2>
              {filteredMetrics.length > 0 && (
                <div className="text-sm text-gray-500">
                  Showing last {filteredMetrics.length} entries
                </div>
              )}
            </div>
            
            {filteredMetrics.length > 0 ? (
              <>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        tickFormatter={(value) => `${value}`} 
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0D9488" 
                        strokeWidth={2} 
                        dot={{ r: 4, strokeWidth: 2 }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">History</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredMetrics
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((metric) => (
                            <tr key={metric.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(metric.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span className="font-medium">{metric.value}</span> {metric.unit}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-primary-600 hover:text-primary-900 mr-3">
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-error-600 hover:text-error-900"
                                  onClick={() => handleDeleteMetric(metric.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 px-4">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
                <p className="text-gray-500 mb-6">
                  Start tracking your {selectedMetricType.toLowerCase()} to see your progress over time.
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  Add First Measurement
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Add Measurement Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Add New Measurement
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metric Type
                </label>
                <select
                  value={newMetric.name}
                  onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {metricTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name} ({type.unit})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={`Enter ${newMetric.name} value`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newMetric.date}
                  onChange={(e) => setNewMetric({ ...newMetric, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMetric}>
                Add Measurement
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Adding the missing ChevronRight component
const ChevronRight = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default HealthTracker;