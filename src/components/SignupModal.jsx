import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiMail, FiUser, FiArrowRight } = FiIcons;

const SignupModal = ({ onClose, onSignup, initialData = {} }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.name || '',
    email: initialData.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      setTimeout(() => {
        onSignup({
          fullName: formData.fullName,
          email: formData.email
        });
        onClose();
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Complete Your Registration</h2>
          <button 
            onClick={onClose} 
            className="text-accent-gray hover:text-primary-navy transition-colors p-2"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        <p className="text-accent-gray mb-8">
          Create your account to access personalized ice breakers and networking strategies.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">
              Full Name
            </label>
            <div className="relative">
              <SafeIcon icon={FiUser} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-gray" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input-field pl-12"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-gray" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field pl-12"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="spinner w-5 h-5 mr-2"></div>
                Creating Account...
              </>
            ) : (
              <>
                CREATE ACCOUNT
                <SafeIcon icon={FiArrowRight} className="ml-2" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-sm text-accent-gray mt-6 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupModal;