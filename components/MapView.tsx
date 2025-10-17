import React from 'react';
import { AlertStatus } from '../types';
import { UserLocationIcon, PoliceCarIcon, AmbulanceVanIcon, MapPinIcon, DroneIcon } from './Icons';

interface MapViewProps {
  alertStatus: AlertStatus;
  isTravelGuardianActive: boolean;
  isDeviating: boolean;
  destination: string;
}

export const MapView: React.FC<MapViewProps> = ({ alertStatus, isTravelGuardianActive, isDeviating, destination }) => {
  const isAlerting = alertStatus !== AlertStatus.SAFE;
  const isHelpOnTheWay = alertStatus === AlertStatus.HELP_ON_THE_WAY;

  return (
    <div className="relative w-full h-64 md:h-80 bg-gray-300 rounded-xl overflow-hidden shadow-lg border-4 border-white">
      {/* Fake map background */}
      <img
        src="https://www.openstreetmap.org/assets/map-background-64532b21696b0c256086f6851d2f171c50e4b8549110825039a06803274dc078.png"
        alt="Map background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* User's Location */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform duration-1000 ${isDeviating ? 'translate-x-10 -translate-y-10' : ''}`}>
        <UserLocationIcon className="w-10 h-10 text-blue-600 drop-shadow-lg" />
        <span className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md">
          YOU
        </span>
        {isAlerting && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-500 rounded-full opacity-30 animate-ping"></div>
        )}
      </div>

      {/* Travel Guardian Elements */}
      {isTravelGuardianActive && (
         <>
            {/* Destination Pin */}
            <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
                 <MapPinIcon className="w-10 h-10 text-green-600 drop-shadow-lg" />
                 <span className="mt-2 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-md truncate max-w-[100px]">
                    {destination}
                 </span>
            </div>
            {/* Simulated Route */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                    d="M 50 50 Q 60 40, 75 25" 
                    stroke={isDeviating ? '#ef4444' : '#3b82f6'} 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray="4 2"
                    className="transition-all duration-500"
                />
            </svg>
         </>
      )}
      
      {/* Responders (only show when help is on the way) */}
      {isHelpOnTheWay && (
        <>
            <div className="absolute top-1/4 left-1/4 animate-move-responder-1">
                <PoliceCarIcon className="w-10 h-10 text-gray-700 drop-shadow-lg" />
            </div>
             <div className="absolute bottom-1/4 right-1/4 animate-move-responder-2">
                <AmbulanceVanIcon className="w-10 h-10 text-gray-700 drop-shadow-lg" />
            </div>
            <div className="absolute animate-fly-in-drone">
                <DroneIcon className="w-10 h-10 text-gray-800 drop-shadow-lg" />
            </div>
        </>
      )}

      {/* Map overlay with status */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-2 rounded-lg text-xs font-semibold text-gray-700">
        Lat: 28.6139, Long: 77.2090 (Simulated)
      </div>
    </div>
  );
};