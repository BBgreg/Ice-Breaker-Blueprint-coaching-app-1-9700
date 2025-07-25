import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AnimatedBackground from './AnimatedBackground';

const { FiTarget, FiUsers, FiTrendingUp, FiZap, FiArrowRight } = FiIcons;

const MarketingPage = ({ onSignup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Section 1: Navigation Bar (Sticky Header) */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-primary-navy">Ice Breaker BluePrint</div>
            <div className="text-xs text-accent-gray">Build Relationships, Not Just a Rolodex.</div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="nav-link font-medium text-primary-navy border-b-2 border-primary-navy">Home</a>
            <a href="#" className="nav-link font-medium text-accent-gray hover:text-primary-navy">Dashboard</a>
            <a href="#" className="nav-link font-medium text-accent-gray hover:text-primary-navy">Settings</a>
            <a href="#" className="nav-link font-medium text-accent-gray hover:text-primary-navy">Support</a>
          </nav>
          
          <button className="md:hidden text-primary-navy text-2xl">
            <SafeIcon icon={FiIcons.FiMenu} />
          </button>
        </div>
      </header>
      
      {/* Section 2: Hero Section */}
      <section className="relative bg-gray-50 min-h-screen flex items-center pt-24 pb-20">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-semibold text-primary-navy mb-6"
            >
              Ice Breakers, Build Relationships, Make Connections
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-accent-gray mb-10 max-w-2xl"
            >
              Professional-grade AI generates value-add ice breakers and conversation starters from dual profile analysis. 
              Transform cold connections into warm conversations.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSignup({ fullName: 'User', email: 'user@example.com' })}
              className="bg-primary-navy text-white px-8 py-4 rounded-lg text-lg font-medium flex items-center"
            >
              Generate Ice Breakers
              <SafeIcon icon={FiArrowRight} className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Section 3: Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-navy mb-4">Why Ice Breaker BluePrint Works</h2>
            <p className="text-xl text-accent-gray max-w-3xl mx-auto">
              Our AI analyzes profiles, context, and goals to generate actionable strategies that turn introductions into opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <SafeIcon icon={FiTarget} />
              </div>
              <h3 className="feature-title">Dual Profile Analysis</h3>
              <p className="feature-text">
                AI analyzes both profiles to find shared connections, interests, and opportunities.
              </p>
            </motion.div>
            
            {/* Feature Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <SafeIcon icon={FiUsers} />
              </div>
              <h3 className="feature-title">F.O.R.D. Framework</h3>
              <p className="feature-text">
                Generate ice breakers based on Family, Occupation, Recreation, and Dreams.
              </p>
            </motion.div>
            
            {/* Feature Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <SafeIcon icon={FiTrendingUp} />
              </div>
              <h3 className="feature-title">Value-Add Suggestions</h3>
              <p className="feature-text">
                Get specific, actionable recommendations to provide genuine value.
              </p>
            </motion.div>
            
            {/* Feature Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <SafeIcon icon={FiZap} />
              </div>
              <h3 className="feature-title">Instant Results</h3>
              <p className="feature-text">
                Generate personalized conversation starters in seconds, not hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Section 4: Final CTA and Footer */}
      <section className="bg-primary-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* CTA Area */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Better Relationships?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who are already using Ice Breaker BluePrint to make meaningful connections.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSignup({ fullName: 'User', email: 'user@example.com' })}
              className="bg-white text-primary-navy px-8 py-4 rounded-lg text-lg font-medium flex items-center mx-auto"
            >
              Start Free Today
              <SafeIcon icon={FiArrowRight} className="ml-2" />
            </motion.button>
          </div>
          
          {/* Divider Line */}
          <div className="border-t border-blue-800 my-10"></div>
          
          {/* Footer */}
          <footer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1 - Brand */}
            <div>
              <div className="text-xl font-semibold mb-2">Ice Breaker BluePrint</div>
              <p className="text-blue-200 mb-4">Build Relationships, Not Just a Rolodex.</p>
              <p className="text-blue-200 text-sm">© 2023 Ice Breaker BluePrint. All rights reserved.</p>
            </div>
            
            {/* Column 2 - Product */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Features</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">API</a></li>
              </ul>
            </div>
            
            {/* Column 3 - Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default MarketingPage;