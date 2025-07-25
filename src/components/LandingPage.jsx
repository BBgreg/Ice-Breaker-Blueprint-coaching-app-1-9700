import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const LandingPage = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    userProfile: '',
    targetProfile: ''
  });

  const handleGenerateClick = () => {
    // For now, we'll trigger the signup flow
    // In a real app, this would process the ice breaker generation
    onSignup({
      fullName: 'User',
      email: 'user@example.com',
      userProfile: formData.userProfile,
      targetProfile: formData.targetProfile
    });
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0B1F3F' }}>
      {/* Background Animation */}
      <AnimatedBackground />
      
      {/* Sign In Button - Top Right */}
      <header className="w-full py-4 px-6 relative z-10">
        <div className="flex justify-end">
          <button 
            onClick={() => onSignup({ fullName: 'User', email: 'user@example.com' })}
            className="text-white font-medium hover:text-gray-300 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-16 relative z-10">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold text-white text-center mb-4 max-w-4xl"
          style={{ fontFamily: 'Inter', fontWeight: '600' }}
        >
          Ice Breakers, Build Relationships, Make Connections
        </motion.h1>
        
        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white text-center mb-16 max-w-2xl"
          style={{ fontFamily: 'Inter', fontSize: '18px' }}
        >
          Professional-grade, actionable strategies, ice breakers and conversation starters that transform cold connections into warm conversations.
        </motion.p>

        {/* Core Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Text Box 1 */}
          <textarea
            value={formData.userProfile}
            onChange={(e) => setFormData({ ...formData, userProfile: e.target.value })}
            placeholder="Your Profile: Add any context here. (e.g., 'Met at the SF tech conference,' 'We have a mutual friend, Jane Doe,' 'I know they're passionate about sustainable energy...')"
            className="w-full h-32 p-6 text-base border-2 border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-20 transition-all"
            style={{ fontFamily: 'Inter' }}
          />

          {/* Text Box 2 */}
          <textarea
            value={formData.targetProfile}
            onChange={(e) => setFormData({ ...formData, targetProfile: e.target.value })}
            placeholder="Target Profile & Context: Add any context here. (e.g., 'Loves hiking,' 'Has a golden retriever,' 'From Colorado,' 'Works in marketing,' 'Wearing a band t-shirt')."
            className="w-full h-32 p-6 text-base border-2 border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-20 transition-all"
            style={{ fontFamily: 'Inter' }}
          />

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateClick}
            className="w-full py-4 px-8 font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center"
            style={{ 
              backgroundColor: '#0B1F3F',
              fontFamily: 'Inter', 
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              minHeight: '56px'
            }}
          >
            <span>✨ Generate Ice Breakers</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;