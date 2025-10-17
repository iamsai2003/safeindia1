import React, { useState, useEffect, useRef } from 'react';
import { MapIcon } from './Icons';

interface TravelGuardianProps {
    isActive: boolean;
    isDeviating: boolean;
    onStartTrip: (destination: string) => void;
    onStopTrip: () => void;
    onDeviationTimeout: () => void;
}

export const TravelGuardian: React.FC<TravelGuardianProps> = ({ 
    isActive, 
    isDeviating, 
    onStartTrip, 
    onStopTrip,
    onDeviationTimeout 
}) => {
    const [destination, setDestination] = useState('');
    const [countdown, setCountdown] = useState(30);
    const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isDeviating) {
            setCountdown(30);
            countdownTimerRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
                        onDeviationTimeout();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
             if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
             }
        }
        
        return () => {
             if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
             }
        }
    }, [isDeviating, onDeviationTimeout]);

    const handleStart = () => {
        if (destination.trim()) {
            onStartTrip(destination.trim());
        }
    };
    
    if (isDeviating) {
        return (
            <div className="w-full flex flex-col items-center p-3 text-left bg-red-100 border-l-4 border-red-500 rounded-lg transition-colors">
                <div className="flex items-center text-red-700 w-full">
                    <MapIcon className="w-6 h-6 mr-4" />
                    <div>
                        <p className="font-bold">Route Deviation Detected!</p>
                        <p className="text-sm">Alerting contacts in <span className="font-bold text-lg">{countdown}s</span></p>
                    </div>
                </div>
                 <button 
                    onClick={onStopTrip}
                    className="mt-3 w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                    I'm Safe
                </button>
            </div>
        )
    }

    if (isActive) {
        return (
             <div className="w-full flex items-center justify-between p-3 text-left bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                    <MapIcon className="w-6 h-6 text-green-600 mr-4" />
                    <div>
                        <p className="font-semibold text-green-800">Trip is Active</p>
                        <p className="text-sm text-green-600">Monitoring your route...</p>
                    </div>
                </div>
                <button 
                    onClick={onStopTrip}
                    className="bg-white text-gray-700 font-semibold py-1 px-3 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                    End
                </button>
            </div>
        )
    }

    return (
        <div className="w-full text-left bg-gray-100 p-3 rounded-lg transition-colors">
            <div className="flex items-center mb-2">
                <MapIcon className="w-6 h-6 text-gray-600 mr-4" />
                <div>
                    <p className="font-semibold text-gray-700">Travel Guardian</p>
                    <p className="text-sm text-gray-500">Monitor your trip for safety.</p>
                </div>
            </div>
            <div className="flex space-x-2 mt-2">
                <input 
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination..."
                    className="flex-grow p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                    onClick={handleStart}
                    disabled={!destination.trim()}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    Start
                </button>
            </div>
        </div>
    );
};
