import React from 'react';
import { AlertStatus } from '../types';
import { ShieldCheckIcon, ShieldExclamationIcon, AmbulanceIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, DroneIcon } from './Icons';

interface StatusPanelProps {
  status: AlertStatus;
}

const statusConfig = {
  [AlertStatus.SAFE]: {
    Icon: ShieldCheckIcon,
    iconClass: 'text-green-500',
    title: 'You are Safe',
    message: 'Your location is not being shared. Press the SOS button in case of an emergency.',
  },
  [AlertStatus.ALERTING]: {
    Icon: ShieldExclamationIcon,
    iconClass: 'text-yellow-500 animate-pulse',
    title: 'Alerting Contacts',
    message: 'Alerting your trusted contacts and emergency services. Stay calm.',
  },
  [AlertStatus.HELP_ON_THE_WAY]: {
    Icon: AmbulanceIcon,
    iconClass: 'text-blue-500 animate-bounce',
    title: 'Help is on the way',
    message: 'Responders have been notified. Your live location is being shared with them.',
  },
};

export const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  const config = statusConfig[status];
  const isAlertingOrHelp = status === AlertStatus.ALERTING || status === AlertStatus.HELP_ON_THE_WAY;
  const isHelpOnTheWay = status === AlertStatus.HELP_ON_THE_WAY;

  return (
    <div className="flex-1 flex items-center">
      <config.Icon className={`w-12 h-12 md:w-16 md:h-16 mr-4 ${config.iconClass}`} />
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{config.title}</h3>
        <p className="text-gray-600 mt-1">{config.message}</p>
        
        {isAlertingOrHelp && (
          <div className="mt-2 flex items-center text-sm text-gray-500 font-semibold animate-pulse">
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2 text-green-600" />
            <span>SMS backup sent to contacts</span>
          </div>
        )}

        {isHelpOnTheWay && (
          <>
            <div className="mt-2 flex items-center text-sm text-red-600 font-bold animate-pulse">
              <VideoCameraIcon className="w-4 h-4 mr-2" />
              <span>RECORDING ACTIVE</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 font-semibold animate-pulse">
              <DroneIcon className="w-4 h-4 mr-2 text-gray-600" />
              <span>Surveillance drone deployed</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};