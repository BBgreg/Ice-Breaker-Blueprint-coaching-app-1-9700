import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiInfo } = FiIcons;

const InfoTooltip = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="text-secondary-text hover:text-primary-dark transition-colors"
      >
        <SafeIcon icon={FiInfo} className="text-sm" />
      </button>
      {showTooltip && (
        <div className="absolute z-10 w-64 p-3 text-small bg-primary-dark text-white rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full">
          <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-dark"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;