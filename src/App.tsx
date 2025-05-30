import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import ResourcesPage from './pages/ResourcesPage';
import MentalWellnessPage from './pages/MentalWellnessPage';
import HealthTrackingPage from './pages/HealthTrackingPage';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="mental-wellness" element={<MentalWellnessPage />} />
            <Route path="health-tracking" element={<HealthTrackingPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;