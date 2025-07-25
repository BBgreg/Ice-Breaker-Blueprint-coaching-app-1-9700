import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import MarketingPage from './components/MarketingPage';
import Dashboard from './components/Dashboard';
import BlueprintResults from './components/BlueprintResults';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/results" element={
              <BlueprintResults 
                onBack={() => window.history.back()}
                onRegenerate={() => window.location.href = '/dashboard'}
              />
            } />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;