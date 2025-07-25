import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import InfoTooltip from './InfoTooltip';
import AnimatedBackground from './AnimatedBackground';

const { FiUser, FiUsers, FiTarget, FiArrowRight, FiLinkedin, FiMail, FiMessageCircle, FiBriefcase, FiUserCheck } = FiIcons;

const Dashboard = ({ user, onGenerateBlueprint }) => {
  const [formData, setFormData] = useState({
    userInfo: '',
    targetInfo: '',
    scenario: ''
  });
  const [loading, setLoading] = useState(false);

  const scenarios = [
    {
      id: 'networking-cold',
      label: 'Cold Networking',
      icon: FiUsers,
      description: 'Professional outreach to new contacts'
    },
    {
      id: 'networking-warm',
      label: 'Warm Introduction',
      icon: FiUserCheck,
      description: 'Following up on mutual connections'
    },
    {
      id: 'sales-meeting',
      label: 'Business Development',
      icon: FiBriefcase,
      description: 'Initial sales or partnership conversations'
    },
    {
      id: 'linkedin-warm',
      label: 'LinkedIn Follow-up',
      icon: FiLinkedin,
      description: 'Professional messaging with context'
    },
    {
      id: 'linkedin-cold',
      label: 'LinkedIn Outreach',
      icon: FiLinkedin,
      description: 'Direct professional messaging'
    },
    {
      id: 'email-cold',
      label: 'Email Outreach',
      icon: FiMail,
      description: 'Professional email introduction'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userInfo || !formData.targetInfo || !formData.scenario) return;
    setLoading(true);
    await onGenerateBlueprint(formData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-dark rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiMessageCircle} className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-primary-dark">Ice Breaker BluePrint</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-small text-secondary-text">Welcome, {user.fullName}</span>
            <div className="w-10 h-10 bg-primary-dark rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-hero font-bold text-primary-dark mb-4">
            Create Your Connection Blueprint
          </h1>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Generate personalized ice breakers and conversation strategies based on your specific networking scenario
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Your Profile Section */}
            <div className="form-group">
              <label className="form-label flex items-center mb-4">
                <SafeIcon icon={FiUser} className="mr-2 text-primary-dark" />
                Your Professional Profile
              </label>
              <p className="text-secondary-text mb-4">
                Share your background, interests, and current role to find connection points.
              </p>
              <textarea
                value={formData.userInfo}
                onChange={(e) => setFormData({ ...formData, userInfo: e.target.value })}
                className="input-field w-full h-32 resize-none"
                placeholder="e.g., 'Software engineer at Google, passionate about AI ethics, recently moved to SF, loves hiking and photography...'"
                required
              />
            </div>

            {/* Target Profile Section */}
            <div className="form-group">
              <label className="form-label flex items-center mb-4">
                <SafeIcon icon={FiUsers} className="mr-2 text-primary-dark" />
                Target Contact & Context
              </label>
              <p className="text-secondary-text mb-4">
                Provide any available information about the person you want to connect with.
              </p>
              <textarea
                value={formData.targetInfo}
                onChange={(e) => setFormData({ ...formData, targetInfo: e.target.value })}
                className="input-field w-full h-32 resize-none"
                placeholder="e.g., 'VP of Engineering at Stripe, met at SF Tech Conference, mutual connection with Jane Doe, passionate about sustainable technology...'"
                required
              />
            </div>

            {/* Scenario Selection */}
            <div className="form-group">
              <label className="form-label flex items-center mb-4">
                <SafeIcon icon={FiTarget} className="mr-2 text-primary-dark" />
                Connection Scenario
              </label>
              <p className="text-secondary-text mb-6">
                Select the type of professional connection you're making.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <motion.label
                    key={scenario.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`card cursor-pointer transition-all ${
                      formData.scenario === scenario.id ? 'bg-primary-dark text-white' : 'hover:shadow-card-hover'
                    }`}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value={scenario.id}
                      checked={formData.scenario === scenario.id}
                      onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-start space-x-3">
                      <SafeIcon
                        icon={scenario.icon}
                        className={`text-xl mt-1 ${formData.scenario === scenario.id ? 'text-white' : 'text-primary-dark'}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{scenario.label}</span>
                          <InfoTooltip content={scenario.description} />
                        </div>
                        <p
                          className={`text-small ${
                            formData.scenario === scenario.id ? 'text-white opacity-90' : 'text-secondary-text'
                          }`}
                        >
                          {scenario.description}
                        </p>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !formData.userInfo || !formData.targetInfo || !formData.scenario}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5 mr-2"></div>
                  Generating Blueprint...
                </>
              ) : (
                <>
                  Generate Blueprint
                  <SafeIcon icon={FiArrowRight} className="text-xl" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;