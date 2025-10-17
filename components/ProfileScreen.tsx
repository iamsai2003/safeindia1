import React from 'react';
import { XMarkIcon, UserIcon, PhoneIcon, BellIcon, ShieldCheckIcon } from './Icons';

interface ProfileScreenProps {
  onClose: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-slide-up">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Profile & Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-8">
            <img
              src="https://picsum.photos/id/433/100/100"
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-rose-500"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Hi, User!</h3>
              <p className="text-gray-500">Stay safe and aware.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-gray-700 text-lg border-b pb-2">Account Information</h4>
            <div className="flex items-center space-x-4 text-gray-600">
              <UserIcon className="w-6 h-6 text-gray-400" />
              <span>
                <p className="font-semibold">Name</p>
                <p>User</p>
              </span>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <PhoneIcon className="w-6 h-6 text-gray-400" />
              <span>
                <p className="font-semibold">Phone Number</p>
                <p>+91 99999 88888</p>
              </span>
            </div>

            <h4 className="font-bold text-gray-700 text-lg border-b pb-2 mt-8">Preferences</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-600">
                <BellIcon className="w-6 h-6 text-gray-400" />
                <span>
                  <p className="font-semibold">Push Notifications</p>
                  <p className="text-sm">Community alerts and safety tips</p>
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-4 text-gray-600">
                <ShieldCheckIcon className="w-6 h-6 text-gray-400" />
                <span>
                  <p className="font-semibold">Voice Activated SOS</p>
                  <p className="text-sm">Say "HELP" to trigger an alert</p>
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 text-center rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-8 py-2 text-sm font-semibold text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors shadow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
