import React from 'react';
import { CommunityAlert } from '../types';
// Fix: Import `ShieldCheckIcon` to resolve the "Cannot find name" error.
import { UsersIcon, ShieldExclamationIcon, ShieldCheckIcon } from './Icons';

interface CommunityAlertsProps {
  alerts: CommunityAlert[];
}

export const CommunityAlerts: React.FC<CommunityAlertsProps> = ({ alerts }) => {
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center mb-3">
        <UsersIcon className="w-6 h-6 text-orange-500 mr-3" />
        <h3 className="font-bold text-gray-800 text-lg">Community Safety Network</h3>
      </div>
      
      {hasAlerts ? (
        <div className="space-y-2">
          {alerts.map(alert => (
            <div key={alert.id} className="p-3 bg-orange-50 rounded-lg flex items-center justify-between animate-fade-in">
              <div className="flex items-center">
                <ShieldExclamationIcon className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800">{alert.location}</p>
                  <p className="text-xs text-gray-500">{alert.timeAgo}</p>
                </div>
              </div>
              <button disabled className="text-xs font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full cursor-not-allowed">
                View
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <ShieldCheckIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No recent alerts in your area. Stay safe!</p>
        </div>
      )}
    </div>
  );
};
