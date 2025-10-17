import React from 'react';
import { PhoneIcon, PhoneHangUpIcon } from './Icons';

interface FakeCallScreenProps {
  onClose: () => void;
}

export const FakeCallScreen: React.FC<FakeCallScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-between p-8 text-white animate-fade-in">
      {/* Caller Info */}
      <div className="text-center mt-20">
        <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4 border-4 border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <h2 className="text-4xl font-bold">Mom</h2>
        <p className="text-xl text-gray-400 mt-2">Incoming Call...</p>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-around items-center">
        <div className="text-center">
          <button onClick={onClose} className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
            <PhoneHangUpIcon className="w-10 h-10 text-white" />
          </button>
          <span className="mt-2 block font-semibold">Decline</span>
        </div>
        <div className="text-center">
          <button onClick={onClose} className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
            <PhoneIcon className="w-10 h-10 text-white" />
          </button>
          <span className="mt-2 block font-semibold">Accept</span>
        </div>
      </div>
    </div>
  );
};