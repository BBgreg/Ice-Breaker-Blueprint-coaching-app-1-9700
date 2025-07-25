import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiMessageCircle, FiCopy, FiCheck, FiRefreshCw, FiUser, FiTarget, FiGift } = FiIcons;

const BlueprintResults = ({ blueprint, onBack, onRegenerate }) => {
  const [copiedItems, setCopiedItems] = useState(new Set());

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

  const sections = [
    {
      id: 'icebreakers',
      title: 'Direct Conversation Starters',
      icon: FiMessageCircle,
      items: blueprint.iceBreakers || [],
      description: 'Ready-to-use opening lines tailored to your specific situation'
    },
    {
      id: 'discovery',
      title: 'Discovery Questions',
      icon: FiUser,
      items: blueprint.discoveryQuestions || [],
      description: 'Subtle questions to uncover common ground and shared interests'
    },
    {
      id: 'valueadds',
      title: 'Value-Add Opportunities',
      icon: FiGift,
      items: blueprint.valueAdds || [],
      description: 'Ways to provide immediate value and strengthen the connection'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="btn-secondary flex items-center space-x-2">
              <SafeIcon icon={FiArrowLeft} className="text-lg" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-dark rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiTarget} className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-primary-dark">Your Connection Blueprint</span>
            </div>
          </div>
          <button onClick={onRegenerate} className="btn-secondary flex items-center space-x-2">
            <SafeIcon icon={FiRefreshCw} className="text-lg" />
            <span>Regenerate</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Strategy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-12"
        >
          <h1 className="text-heading font-bold text-primary-dark mb-4">Connection Strategy</h1>
          <p className="text-lg text-secondary-text leading-relaxed">
            {blueprint.strategy}
          </p>
        </motion.div>

        {/* Results Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + sectionIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <SafeIcon icon={section.icon} className="text-primary-dark text-xl" />
                </div>
                <div>
                  <h2 className="result-card-title">{section.title}</h2>
                  <p className="text-secondary-text">{section.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {section.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + sectionIndex * 0.1 + index * 0.05 }}
                    className="result-card"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-small font-semibold text-primary-dark">
                        Option {index + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(
                          section.id === 'valueadds' ? item.action : item.text,
                          `${section.id}-${index}`
                        )}
                        className="text-secondary-text hover:text-primary-dark transition-colors"
                      >
                        <SafeIcon icon={copiedItems.has(`${section.id}-${index}`) ? FiCheck : FiCopy} className="text-lg" />
                      </button>
                    </div>

                    {section.id === 'valueadds' ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary-dark mb-2">Action:</h4>
                          <p className="result-card-content font-medium">{item.action}</p>
                        </div>
                        {item.template && (
                          <div>
                            <h4 className="font-semibold text-primary-dark mb-2">Message Template:</h4>
                            <blockquote className="bg-accent p-4 rounded-lg italic result-card-content">
                              "{item.template}"
                            </blockquote>
                          </div>
                        )}
                        <div className="bg-accent p-4 rounded-lg">
                          <h4 className="font-semibold text-primary-dark mb-2">Why this works:</h4>
                          <p className="result-card-content">{item.explanation}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <blockquote className="text-lg font-medium text-primary-dark leading-relaxed border-l-4 border-primary-dark pl-4">
                          "{item.text}"
                        </blockquote>
                        <div className="bg-accent p-4 rounded-lg">
                          <h4 className="font-semibold text-primary-dark mb-2">Why this works:</h4>
                          <p className="result-card-content">{item.explanation}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow-up Section */}
        {blueprint.followUp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card mt-12"
          >
            <h2 className="result-card-title mb-4">Follow-Up Strategy</h2>
            <div className="bg-accent p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-primary-dark mb-2">Next Step:</h4>
                <p className="result-card-content">{blueprint.followUp.nextStep}</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary-dark mb-2">Suggested Topic:</h4>
                <p className="result-card-content">{blueprint.followUp.suggestedTopic}</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BlueprintResults;