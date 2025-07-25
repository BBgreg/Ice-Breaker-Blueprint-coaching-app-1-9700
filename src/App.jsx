import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import MarketingPage from './components/MarketingPage';
import Dashboard from './components/Dashboard';
import BlueprintResults from './components/BlueprintResults';
import SignupModal from './components/SignupModal';
import { generateBlueprint } from './services/aiService';

function App() {
  const [user, setUser] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [currentView, setCurrentView] = useState('marketing');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupData, setSignupData] = useState({});

  useEffect(() => {
    const savedUser = localStorage.getItem('ice_breaker_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setCurrentView('dashboard');
      } catch (e) {
        console.error('Error parsing saved user data:', e);
        localStorage.removeItem('ice_breaker_user');
      }
    }
  }, []);

  const handleSignupClick = (initialData = {}) => {
    setSignupData(initialData);
    setShowSignupModal(true);
  };

  const handleSignupComplete = (userData) => {
    const userWithId = { ...userData, id: 'user_' + Date.now() };
    setUser(userWithId);
    localStorage.setItem('ice_breaker_user', JSON.stringify(userWithId));
    setShowSignupModal(false);
    setCurrentView('dashboard');
  };

  const handleGenerateBlueprint = async (formData) => {
    try {
      setCurrentView('loading');
      const generatedBlueprint = await generateBlueprint(formData);
      setBlueprint(generatedBlueprint);
      setCurrentView('results');
    } catch (error) {
      console.error('Error generating blueprint:', error);
      alert('There was an error generating your blueprint. Please try again.');
      setCurrentView('dashboard');
    }
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  const handleRegenerate = () => {
    setCurrentView('dashboard');
    setBlueprint(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'marketing':
        return <MarketingPage onSignup={handleSignupClick} />;
      case 'dashboard':
        return user ? (
          <Dashboard user={user} onGenerateBlueprint={handleGenerateBlueprint} />
        ) : (
          <MarketingPage onSignup={handleSignupClick} />
        );
      case 'loading':
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-6"></div>
              <h2 className="text-subheading font-bold text-primary-dark mb-4">Generating Your Blueprint</h2>
              <p className="text-secondary-text">Our AI is analyzing your information and creating personalized strategies...</p>
            </div>
          </div>
        );
      case 'results':
        return blueprint ? (
          <BlueprintResults blueprint={blueprint} onBack={handleBack} onRegenerate={handleRegenerate} />
        ) : (
          <Dashboard user={user} onGenerateBlueprint={handleGenerateBlueprint} />
        );
      default:
        return <MarketingPage onSignup={handleSignupClick} />;
    }
  };

  return (
    <Router>
      <div className="App">
        {renderCurrentView()}
        
        {/* Signup Modal */}
        {showSignupModal && (
          <SignupModal 
            onClose={() => setShowSignupModal(false)} 
            onSignup={handleSignupComplete}
            initialData={signupData}
          />
        )}
      </div>
    </Router>
  );
}

export default App;