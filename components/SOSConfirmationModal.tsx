
import React, { useState, useEffect } from 'react';

interface SOSConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const COUNTDOWN_SECONDS = 5;

export const SOSConfirmationModal: React.FC<SOSConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (countdown <= 0) {
      onConfirm();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onConfirm]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((countdown / COUNTDOWN_SECONDS)) * circumference;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center animate-fade-in p-4">
      <div className="relative flex items-center justify-center w-52 h-52">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r={radius} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="10" fill="transparent" />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#ef4444"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            style={{ transition: 'stroke-dashoffset 1s linear', strokeLinecap: 'round' }}
          />
        </svg>
        <span className="absolute text-7xl font-bold text-white animate-pulse">{countdown}</span>
      </div>
      <h2 className="text-2xl font-bold text-white mt-8 text-center">Alerting contacts in...</h2>
      <p className="text-gray-300 mt-2 text-center max-w-sm">Your location will be sent to your trusted contacts and emergency services.</p>
      <button
        onClick={onCancel}
        className="mt-12 bg-white text-gray-800 font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg"
      >
        CANCEL
      </button>
    </div>
  );
};
