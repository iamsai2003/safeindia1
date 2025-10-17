
import React from 'react';
import { EmergencyService } from '../types';
import { PhoneIcon } from './Icons';

interface EmergencyServiceCardProps {
  service: EmergencyService;
}

export const EmergencyServiceCard: React.FC<EmergencyServiceCardProps> = ({ service }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
      <div className="flex items-center">
        <div className="p-3 bg-red-200 rounded-full mr-4">
            <service.icon className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{service.name}</p>
          <p className="text-sm text-gray-500">{service.number}</p>
        </div>
      </div>
      <a href={`tel:${service.number}`} className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
        <PhoneIcon className="w-5 h-5" />
      </a>
    </div>
  );
};
