import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SOSButton } from './components/SOSButton';
import { StatusPanel } from './components/StatusPanel';
import { ContactCard } from './components/ContactCard';
import { EmergencyServiceCard } from './components/EmergencyServiceCard';
import { SafetyFeed } from './components/SafetyFeed';
import { MapView } from './components/MapView';
import { AddContactForm } from './components/AddContactForm';
import { ProfileScreen } from './components/ProfileScreen';
import { FakeCallScreen } from './components/FakeCallScreen';
import { EmergencyLog } from './components/EmergencyLog';
import { AIInsight } from './components/AIInsight';
import { TravelGuardian } from './components/TravelGuardian';
import { CommunityAlerts } from './components/CommunityAlerts';
import { PlusIcon, BoltIcon, ShieldExclamationIcon, UserIcon, CheckCircleIcon, PoliceCarIcon, MicrophoneIcon, DroneIcon } from './components/Icons';
import { AlertStatus, Contact, LogEntry, CommunityAlert } from './types';
import { TRUSTED_CONTACTS, EMERGENCY_SERVICES, COMMUNITY_ALERTS } from './constants';

// Fix: Add type definitions for the non-standard SpeechRecognition API to resolve TypeScript errors.
interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const App: React.FC = () => {
  const [alertStatus, setAlertStatus] = useState<AlertStatus>(AlertStatus.SAFE);
  const [contacts, setContacts] = useState<Contact[]>(TRUSTED_CONTACTS);
  const [communityAlerts, setCommunityAlerts] = useState<CommunityAlert[]>(COMMUNITY_ALERTS);
  const [lastLocationUpdate, setLastLocationUpdate] = useState<Date | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAddContactFormOpen, setIsAddContactFormOpen] = useState<boolean>(false);
  const [isFakeCallActive, setIsFakeCallActive] = useState<boolean>(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  // State for Travel Guardian
  const [isTravelGuardianActive, setIsTravelGuardianActive] = useState(false);
  const [isDeviating, setIsDeviating] = useState(false);
  const [destination, setDestination] = useState('');
  
  // State for Voice Activation
  const [isListening, setIsListening] = useState(false);
  const [voiceSupport, setVoiceSupport] = useState<'supported' | 'unsupported' | 'denied'>('unsupported');
  
  const logTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const deviationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const triggerSOS = () => {
    if (alertStatus !== AlertStatus.SAFE) return; // Prevent re-triggering

    setAlertStatus(AlertStatus.ALERTING);
    
    // Voice Feedback for accessibility
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("SOS activated. Notifying contacts and emergency services.");
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => setAlertStatus(AlertStatus.HELP_ON_THE_WAY), 3000);
  };

  // Use a ref to ensure the latest triggerSOS function is called from the speech recognition callback
  const triggerSOSRef = useRef(triggerSOS);
  triggerSOSRef.current = triggerSOS;
  
  const cancelSOS = () => {
     setAlertStatus(AlertStatus.SAFE);
  };

  // Effect for setting up Speech Recognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setVoiceSupport('unsupported');
      return;
    }

    setVoiceSupport('supported');
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      if (command.includes('help')) {
        // Trigger SOS directly via ref to get latest function state
        triggerSOSRef.current();
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setVoiceSupport('denied');
        setIsListening(false);
      }
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);


  const addLogEntry = (message: string, icon: React.ElementType) => {
    setLogEntries(prev => [...prev, {
      id: prev.length,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      icon,
    }]);
  };

  useEffect(() => {
    // Clear any existing timeouts when alertStatus changes
    logTimerRef.current.forEach(clearTimeout);
    logTimerRef.current = [];
    
    let intervalId: ReturnType<typeof setInterval> | null = null;
    
    if (alertStatus !== AlertStatus.SAFE) {
      // Stop travel guardian if an SOS is active
      if (isTravelGuardianActive) {
        setIsTravelGuardianActive(false);
        setIsDeviating(false);
        if(deviationTimerRef.current) clearTimeout(deviationTimerRef.current);
      }
      
      // Simulate location updates every 5 seconds when alert is active
      setLastLocationUpdate(new Date());
      intervalId = setInterval(() => {
        setLastLocationUpdate(new Date());
      }, 5000);

      // Initialize and populate the emergency log
      setLogEntries([]); // Clear previous logs
      
      const timers: ReturnType<typeof setTimeout>[] = [];

      timers.push(setTimeout(() => addLogEntry('SOS alert triggered. Your location is being shared.', ShieldExclamationIcon), 500));
      
      contacts.forEach((contact, index) => {
         timers.push(setTimeout(() => addLogEntry(`Notifying ${contact.name} (${contact.relation})...`, UserIcon), 1500 + index * 1000));
         timers.push(setTimeout(() => addLogEntry(`${contact.name} has acknowledged the alert.`, CheckCircleIcon), 4000 + index * 1500));
      });
      
      timers.push(setTimeout(() => addLogEntry('Emergency services have been dispatched.', PoliceCarIcon), 8000));
      timers.push(setTimeout(() => addLogEntry('Surveillance drone deployed to your location.', DroneIcon), 9500));

      logTimerRef.current = timers;

    } else {
      setLastLocationUpdate(null);
      setLogEntries([]); // Clear logs when safe
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      logTimerRef.current.forEach(clearTimeout);
    };
  }, [alertStatus, contacts, isTravelGuardianActive]);

  const handleSOSClick = () => {
    if (alertStatus === AlertStatus.SAFE) {
      triggerSOS();
    } else {
      cancelSOS();
    }
  };
  
  const handleStartTrip = (newDestination: string) => {
    setDestination(newDestination);
    setIsTravelGuardianActive(true);
    setIsDeviating(false);
    // Simulate a deviation after 8 seconds
    deviationTimerRef.current = setTimeout(() => {
        setIsDeviating(true);
    }, 8000);
  };

  const handleStopTrip = () => {
    setIsTravelGuardianActive(false);
    setIsDeviating(false);
    setDestination('');
    if (deviationTimerRef.current) {
        clearTimeout(deviationTimerRef.current);
    }
  };
  
  const handleDeviationTimeout = () => {
    handleStopTrip();
    triggerSOS();
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const renderVoiceControlButton = () => {
    let content;
    switch (voiceSupport) {
        case 'unsupported':
            content = (
                <div>
                    <p className="font-semibold text-gray-700">Voice SOS Unavailable</p>
                    <p className="text-sm text-gray-500">Browser not supported.</p>
                </div>
            );
            break;
        case 'denied':
            content = (
                <div>
                    <p className="font-semibold text-gray-700">Mic Access Denied</p>
                    <p className="text-sm text-gray-500">Enable in settings.</p>
                </div>
            );
            break;
        case 'supported':
            content = (
                <div>
                    <p className="font-semibold text-gray-700">{isListening ? 'Listening for "HELP"' : 'Voice Activated SOS'}</p>
                    <p className="text-sm text-gray-500">{isListening ? 'Say "HELP" to trigger alert.' : 'Tap to enable voice commands.'}</p>
                </div>
            );
            break;
    }

    return (
        <button 
            onClick={handleVoiceToggle}
            disabled={voiceSupport !== 'supported'}
            className={`w-full flex items-center p-3 text-left rounded-lg transition-colors ${
                voiceSupport !== 'supported' 
                ? 'bg-gray-200 cursor-not-allowed opacity-60' 
                : isListening 
                ? 'bg-blue-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
        >
            <MicrophoneIcon className={`w-6 h-6 mr-4 flex-shrink-0 ${
                isListening ? 'text-blue-500 animate-pulse' : 'text-blue-500'
            }`} />
            {content}
        </button>
    );
  }

  const handleSaveContact = (newContactData: Omit<Contact, 'id' | 'avatarUrl'>) => {
    const newContact: Contact = {
      id: contacts.length + 1,
      ...newContactData,
      avatarUrl: `https://picsum.photos/seed/${contacts.length + 1}/100/100`,
    };
    setContacts([newContact, ...contacts]);
    setIsAddContactFormOpen(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header 
        onProfileClick={() => setIsProfileOpen(true)}
        onSOSClick={handleSOSClick}
        alertStatus={alertStatus}
      />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (or top on mobile) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <StatusPanel status={alertStatus} />
            </div>
            {alertStatus !== AlertStatus.SAFE && <EmergencyLog entries={logEntries} />}
            <div className="relative">
              <MapView 
                alertStatus={alertStatus} 
                isTravelGuardianActive={isTravelGuardianActive} 
                isDeviating={isDeviating} 
                destination={destination}
              />
            </div>
            <SafetyFeed />
          </div>

          {/* Right Column (or bottom on mobile) */}
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-sm">
              <SOSButton status={alertStatus} onClick={handleSOSClick} />
              <p className="text-gray-500 mt-4 text-center text-sm">
                Press in case of emergency. Your location and a message will be sent to trusted contacts.
              </p>
            </div>

            {/* Other tools */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-3 text-lg">Safety Tools</h3>
                 <div className="space-y-2">
                    <TravelGuardian
                        isActive={isTravelGuardianActive}
                        isDeviating={isDeviating}
                        onStartTrip={handleStartTrip}
                        onStopTrip={handleStopTrip}
                        onDeviationTimeout={handleDeviationTimeout}
                    />
                    <button 
                        onClick={() => setIsFakeCallActive(true)}
                        className="w-full flex items-center p-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <BoltIcon className="w-6 h-6 text-blue-500 mr-4" />
                        <div>
                            <p className="font-semibold text-gray-700">Fake Incoming Call</p>
                            <p className="text-sm text-gray-500">Simulate a call to get out of a situation.</p>
                        </div>
                    </button>
                    {renderVoiceControlButton()}
                 </div>
            </div>
            
            <AIInsight />
            
            {/* New Community Alerts Component */}
            {alertStatus === AlertStatus.SAFE && <CommunityAlerts alerts={communityAlerts} />}

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Emergency Services</h3>
              <div className="space-y-2">
                {EMERGENCY_SERVICES.map((service) => (
                  <EmergencyServiceCard key={service.name} service={service} />
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 text-lg">Trusted Contacts</h3>
                <button 
                  onClick={() => setIsAddContactFormOpen(true)} 
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  aria-label="Add new contact"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <ContactCard 
                    key={contact.id} 
                    contact={contact} 
                    alertStatus={alertStatus}
                    lastLocationUpdate={lastLocationUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals and Overlays */}
      {isProfileOpen && <ProfileScreen onClose={() => setIsProfileOpen(false)} />}
      {isAddContactFormOpen && <AddContactForm onClose={() => setIsAddContactFormOpen(false)} onSave={handleSaveContact} />}
      {isFakeCallActive && <FakeCallScreen onClose={() => setIsFakeCallActive(false)} />}

    </div>
  );
};

export default App;