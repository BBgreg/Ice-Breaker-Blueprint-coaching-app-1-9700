import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiCircle, FiTrendingUp, FiUsers, FiMessageCircle } = FiIcons;

const ProgressCard = () => {
  const steps = [
    { id: 1, title: 'Profile Setup', completed: true },
    { id: 2, title: 'Target Analysis', completed: false },
    { id: 3, title: 'Blueprint Generated', completed: false }
  ];

  const stats = [
    { label: 'Blueprints Created', value: '0', icon: FiMessageCircle },
    { label: 'Success Rate', value: '0%', icon: FiTrendingUp },
    { label: 'Connections Made', value: '0', icon: FiUsers }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Your Progress</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <SafeIcon icon={step.completed ? FiCheck : FiCircle} className="text-sm" />
              </div>
              <span className={`text-sm ${
                step.completed ? 'text-navy-900 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Your Stats</h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={stat.icon} className="text-navy-600 text-sm" />
                </div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className="text-sm font-semibold text-navy-900">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-gradient-to-br from-navy-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-gray-600">
          The most effective ice breakers reference something specific from their profile or recent activity. 
          Personal touches increase response rates by 3x!
        </p>
      </div>
    </div>
  );
};

export default ProgressCard;