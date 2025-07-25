import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useUser } from '../context/UserContext';
import ProgressCard from './ProgressCard';

const { FiSpark, FiLinkedin, FiGlobe, FiMessageSquare, FiTarget } = FiIcons;

const Dashboard = () => {
  const navigate = useNavigate();
  const { setAnalysisData, userStats } = useUser();
  const [formData, setFormData] = useState({
    yourLinkedIn: '',
    yourWebsite: '',
    yourContext: '',
    theirLinkedIn: '',
    theirWebsite: '',
    theirContext: '',
    scenario: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const scenarios = [
    'Networking (Cold Outreach)',
    'Networking (Warm Intro)',
    'Sales Meeting',
    'LinkedIn DM (Warm Intro)',
    'LinkedIn DM (Cold Outreach)',
    'Email (Cold Outreach)',
    'Email (Warm Intro)',
    'Social Event (Casual)',
    'Dating (Initial Contact)'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleScenarioSelect = (scenario) => {
    setFormData(prev => ({
      ...prev,
      scenario
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to generate ice breakers
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response data
    const mockResults = {
      strategy: "Based on your shared alumni network and their recent activity around AI ethics, the optimal strategy is a value-first approach. Lead with a relevant insight before transitioning to a request for a brief chat.",
      iceBreakers: [
        {
          type: "Comment + Question",
          content: "I saw your recent post on the future of supply chains. How do you see generative AI impacting logistics over the next 5 years?",
          why: "Positions you as an informed peer and opens a high-level professional dialogue."
        },
        {
          type: "Comment + Question", 
          content: "That's an amazing shot from Machu Picchu! Was the hike as tough as they say?",
          why: "Shows genuine interest in their personal experiences and creates an opportunity for storytelling."
        },
        {
          type: "Comment + Question",
          content: "Congratulations on your son's graduation from UCLA! As a fellow professional balancing work and family, how do you manage to stay so engaged in your career while celebrating these big family moments?",
          why: "Acknowledges personal milestone and shows you see them as a whole person, not just a job title."
        },
        {
          type: "Comment + Question",
          content: "Your career progression in product management is really inspiring. What do you consider the most critical skill for a product manager to develop today?",
          why: "Combines genuine compliment with request for mentorship-style advice, effective for professional relationships."
        }
      ],
      discoveryQuestions: [
        {
          content: "I'm exploring new project management tools. Have you come across any that integrate well with a remote-first engineering team?",
          why: "Creates natural opening for them to discuss their work without directly mentioning their employer."
        },
        {
          content: "I'm looking to get outdoors more this weekend, have you found any good trails around here?",
          why: "Subtle way to discover their hiking interests without revealing you've researched them."
        },
        {
          content: "I saw your post celebrating your son's graduation - congrats! My niece is starting to look at colleges in California. Did he have a favorite thing about his time at UCLA?",
          why: "Creates personal connection by asking for advice, which is subtle and effective for building rapport."
        },
        {
          content: "Your job sounds incredibly rewarding but also probably pretty exhausting. When you're not shaping young minds, what's your favorite way to recharge?",
          why: "Shows empathy and pivots conversation toward their personal life and hobbies."
        }
      ],
      valueAdds: [
        {
          action: "Share this McKinsey article on B2B SaaS growth",
          template: "Hi [Name], saw this article and thought of your work in the SaaS space. Hope you find it insightful.",
          why: "Provides relevant industry insight directly related to their professional focus."
        },
        {
          action: "Introduce them to Jane Doe at HubSpot",
          template: "I'd love to introduce you to Jane Doe who scaled marketing analytics at HubSpot. She might have insights relevant to your current projects.",
          why: "Offers valuable professional connection that could benefit their career."
        },
        {
          action: "Invite to upcoming AI ethics conference",
          template: "There's an AI ethics conference next month that aligns perfectly with your recent posts. Would you be interested in attending together?",
          why: "Shows you've paid attention to their interests and offers shared experience opportunity."
        }
      ]
    };

    setAnalysisData(mockResults);
    setIsLoading(false);
    navigate('/results');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            New Connection Blueprint
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's analyze profiles and context to generate personalized ice breakers and connection strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Card */}
          <div className="lg:col-span-1">
            <ProgressCard />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Your Profile Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center space-x-3">
                    <SafeIcon icon={FiTarget} className="text-navy-600" />
                    <span>Your Profile</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    First, let's add your details so we can find points of connection.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your LinkedIn URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiLinkedin} className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="yourLinkedIn"
                          value={formData.yourLinkedIn}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                          placeholder="https://linkedin.com/in/yourprofile"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Website (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiGlobe} className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="yourWebsite"
                          value={formData.yourWebsite}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Context
                    </label>
                    <textarea
                      name="yourContext"
                      value={formData.yourContext}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                      placeholder="Add any other context here. (e.g., 'Met at the SF tech conference,' 'We have a mutual friend, Jane Doe,' 'I know they're passionate about sustainable energy...')"
                    />
                  </div>
                </div>

                {/* Target Profile Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-navy-900 mb-4 flex items-center space-x-3">
                    <SafeIcon icon={FiMessageSquare} className="text-navy-600" />
                    <span>Target Profile & Context</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Now, tell us who you want to connect with and what you know.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Their LinkedIn URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiLinkedin} className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="theirLinkedIn"
                          value={formData.theirLinkedIn}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                          placeholder="https://linkedin.com/in/theirprofile"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Their Website/Bio (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiGlobe} className="text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="theirWebsite"
                          value={formData.theirWebsite}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                          placeholder="https://theirwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Context
                    </label>
                    <textarea
                      name="theirContext"
                      value={formData.theirContext}
                      onChange={handleChange}
                      rows={4}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-navy-600 input-focus"
                      placeholder="Add any other context here. Copy and paste any other information, details, keywords, topics, resume, etc."
                    />
                  </div>
                </div>

                {/* Scenario Selection */}
                <div>
                  <h2 className="text-2xl font-semibold text-navy-900 mb-4">
                    Define the Scenario
                  </h2>
                  <p className="text-gray-600 mb-6">
                    What is your primary goal for this connection?
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario}
                        type="button"
                        onClick={() => handleScenarioSelect(scenario)}
                        className={`p-4 rounded-lg text-left scenario-button ${
                          formData.scenario === scenario ? 'selected' : ''
                        }`}
                      >
                        <span className="font-medium">{scenario}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isLoading || !formData.scenario}
                    className="w-full bg-navy-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SafeIcon icon={FiSpark} className="text-xl" />
                    <span>
                      {isLoading ? 'Generating Ice Breakers...' : 'Generate Ice Breakers & Connection Blueprint'}
                    </span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
