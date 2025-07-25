import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import AnimatedBackground from './AnimatedBackground';
import SignupModal from './SignupModal';

const { FiArrowRight, FiCheck, FiUsers, FiTarget, FiTrendingUp, FiZap } = FiIcons;

const MarketingPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const features = [
    {
      icon: FiUsers,
      title: 'F.O.R.D. Framework',
      description: 'Generate ice breakers based on Family, Occupation, Recreation, and Dreams.'
    },
    {
      icon: FiTrendingUp,
      title: 'Value-Add Suggestions',
      description: 'Get specific, actionable recommendations to provide genuine value.'
    },
    {
      icon: FiZap,
      title: 'Instant Results',
      description: 'Generate personalized conversation starters in seconds, not hours.'
    }
  ];

  const handleGetStarted = () => {
    setShowSignupModal(true);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setShowSignupModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Ice Breakers, Build Relationships,<br />
              <span className="text-gray-600">Make Connections</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ice breakers and conversation starters to ease anxiety and build confidence
            </p>
            <motion.button
              onClick={handleGetStarted}
              className="inline-flex items-center space-x-3 bg-navy-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Generate Ice Breakers</span>
              <SafeIcon icon={FiArrowRight} className="text-xl" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Ice Breaker BluePrint Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our blueprints and strategies reduce approach anxiety by making the conversation more natural and facilitating connections through small, manageable steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
              >
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="text-2xl text-navy-900" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From stranger to connected in seconds!
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands who are using our Blueprints to unlock conversations with ease.
            </p>
            <motion.button
              onClick={handleGetStarted}
              className="inline-flex items-center space-x-3 bg-white text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Spark a Chat</span>
              <SafeIcon icon={FiArrowRight} className="text-xl" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={handleSignupSuccess}
      />
    </div>
  );
};

export default MarketingPage;
