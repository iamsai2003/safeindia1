
import { PoliceIcon, AmbulanceIcon, FireIcon } from './components/Icons';
import { Contact, EmergencyService, CommunityAlert } from './types';

export const TRUSTED_CONTACTS: Contact[] = [
  {
    id: 1,
    name: 'Anjali Sharma',
    relation: 'Mother',
    phone: '+91 98765 43210',
    avatarUrl: 'https://picsum.photos/id/1027/100/100',
  },
  {
    id: 2,
    name: 'Rohan Verma',
    relation: 'Brother',
    phone: '+91 98765 12345',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
  },
  {
    id: 3,
    name: 'Priya Singh',
    relation: 'Friend',
    phone: '+91 91234 56789',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
  },
];

export const EMERGENCY_SERVICES: EmergencyService[] = [
    { name: 'Police', number: '100', icon: PoliceIcon },
    { name: 'Ambulance', number: '102', icon: AmbulanceIcon },
    { name: 'Fire', number: '101', icon: FireIcon },
];

export const COMMUNITY_ALERTS: CommunityAlert[] = [
  {
    id: 1,
    location: 'Near Connaught Place',
    timeAgo: '2m ago',
  },
  {
    id: 2,
    location: 'Sector 29, Gurgaon',
    timeAgo: '15m ago',
  },
  {
    id: 3,
    location: 'Lajpat Nagar Market',
    timeAgo: '32m ago',
  }
];