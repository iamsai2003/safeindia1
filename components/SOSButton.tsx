
import React from 'react';
import { AlertStatus } from '../types';

interface SOSButtonProps {
  status: AlertStatus;
  onClick: () => void;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ status, onClick }) => {
  const isSafe = status === AlertStatus.SAFE;

  const buttonClasses = isSafe
    ? 'bg-red-500 hover:bg-red-600 animate-pulse-red'
    : 'bg-gray-400 hover:bg-gray-500';
  
  const buttonText = isSafe ? 'SOS' : 'CANCEL';

  return (
    <button
      onClick={onClick}
      className={`w-40 h-40 md:w-48 md:h-48 rounded-full text-white font-extrabold text-4xl flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-300 shadow-2xl ${buttonClasses}`}
    >
      {buttonText}
    </button>
  );
};
