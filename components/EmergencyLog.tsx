import React from 'react';
import { LogEntry } from '../types';

interface EmergencyLogProps {
  entries: LogEntry[];
}

export const EmergencyLog: React.FC<EmergencyLogProps> = ({ entries }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm animate-fade-in">
      <h3 className="font-bold text-gray-800 mb-3 text-lg">Live Emergency Log</h3>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start animate-fade-in">
            <div className="flex-shrink-0 mr-3 mt-1">
              <entry.icon className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{entry.message}</p>
              <p className="text-xs text-gray-400">{entry.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};