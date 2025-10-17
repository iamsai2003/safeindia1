import React from 'react';
import { ShieldCheckIcon, ShieldExclamationIcon } from './Icons';
import { AlertStatus } from '../types';

interface HeaderProps {
  onProfileClick: () => void;
  onSOSClick: () => void;
  alertStatus: AlertStatus;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick, onSOSClick, alertStatus }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ShieldCheckIcon className="w-8 h-8 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            SAFE <span className="text-rose-500">INDIA</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
            {alertStatus === AlertStatus.SAFE && (
                 <button
                    onClick={onSOSClick}
                    className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 animate-pulse-red"
                    aria-label="Activate SOS"
                >
                    <ShieldExclamationIcon className="w-6 h-6" />
                </button>
            )}
            <button
            onClick={onProfileClick}
            className="flex items-center space-x-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Open profile settings"
            >
            <span className="font-semibold text-gray-600 hidden sm:block">
                Hi, User!
            </span>
            <img
                src="https://picsum.photos/id/433/100/100"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-rose-500"
            />
            </button>
        </div>
      </div>
    </header>
  );
};