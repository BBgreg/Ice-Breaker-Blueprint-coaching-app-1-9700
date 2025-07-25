import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useUser } from '../context/UserContext';

const { FiArrowLeft, FiRefreshCw, FiCopy, FiCheck } = FiIcons;

const ResultsPage = () => {
  const navigate = useNavigate();
  const { analysisData } = useUser();
  const [copiedItems, setCopiedItems] = React.useState(new Set());

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!analysisData) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-navy-900 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="text-lg" />
            <span>Back to Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="text-lg" />
            <span>Generate New</span>
          </button>
        </div>

        {/* Strategy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Your Connection Strategy</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{analysisData.strategy}</p>
        </motion.div>

        {/* Ice Breakers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-navy-900 mb-6">Ice Breakers</h2>
          <div className="space-y-6">
            {analysisData.iceBreakers?.map((iceBreaker, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-navy-600">Option {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(iceBreaker.content, `icebreaker-${index}`)}
                    className="text-gray-400 hover:text-navy-600 transition-colors"
                  >
                    <SafeIcon 
                      icon={copiedItems.has(`icebreaker-${index}`) ? FiCheck : FiCopy} 
                      className="text-lg" 
                    />
                  </button>
                </div>
                <blockquote className="text-navy-900 font-medium mb-3 text-lg">
                  "{iceBreaker.content}"
                </blockquote>
                <p className="text-gray-600 text-sm">
                  <strong>Why this works:</strong> {iceBreaker.why}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discovery Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-navy-900 mb-6">Discovery Questions</h2>
          <div className="space-y-6">
            {analysisData.discoveryQuestions?.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-navy-600">Question {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(question.content, `question-${index}`)}
                    className="text-gray-400 hover:text-navy-600 transition-colors"
                  >
                    <SafeIcon 
                      icon={copiedItems.has(`question-${index}`) ? FiCheck : FiCopy} 
                      className="text-lg" 
                    />
                  </button>
                </div>
                <blockquote className="text-navy-900 font-medium mb-3">
                  "{question.content}"
                </blockquote>
                <p className="text-gray-600 text-sm">
                  <strong>Why this works:</strong> {question.why}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Value Adds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-xl font-bold text-navy-900 mb-6">Value-Add Opportunities</h2>
          <div className="space-y-6">
            {analysisData.valueAdds?.map((valueAdd, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-navy-600">Opportunity {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(valueAdd.action, `valueadd-${index}`)}
                    className="text-gray-400 hover:text-navy-600 transition-colors"
                  >
                    <SafeIcon 
                      icon={copiedItems.has(`valueadd-${index}`) ? FiCheck : FiCopy} 
                      className="text-lg" 
                    />
                  </button>
                </div>
                <h4 className="font-semibold text-navy-900 mb-2">Action:</h4>
                <p className="text-gray-800 mb-3">{valueAdd.action}</p>
                {valueAdd.template && (
                  <>
                    <h4 className="font-semibold text-navy-900 mb-2">Message Template:</h4>
                    <blockquote className="bg-gray-50 p-4 rounded-lg italic text-gray-700 mb-3">
                      "{valueAdd.template}"
                    </blockquote>
                  </>
                )}
                <p className="text-gray-600 text-sm">
                  <strong>Why this works:</strong> {valueAdd.why}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;