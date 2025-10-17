
import React from 'react';
import { Contact, AlertStatus } from '../types';
import { PhoneIcon } from './Icons';

interface ContactCardProps {
  contact: Contact;
  alertStatus: AlertStatus;
  lastLocationUpdate: Date | null;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, alertStatus, lastLocationUpdate }) => {
  const isAlerting = alertStatus !== AlertStatus.SAFE;

  return (
    <div className={`p-3 rounded-lg flex items-center justify-between transition-all duration-300 ${isAlerting ? 'bg-red-100 border-l-4 border-red-500' : 'bg-gray-50'}`}>
      <div className="flex items-center">
        <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
        <div>
          <p className="font-bold text-gray-800">{contact.name}</p>
          <p className="text-sm text-gray-500">{contact.relation}</p>
          {isAlerting && lastLocationUpdate && (
             <p className="text-xs text-red-600 font-semibold mt-1 animate-pulse">
                Location shared @ {lastLocationUpdate.toLocaleTimeString()}
             </p>
          )}
        </div>
      </div>
      <a href={`tel:${contact.phone}`} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
        <PhoneIcon className="w-5 h-5" />
      </a>
    </div>
  );
};
