import type { ElementType } from 'react';

export enum AlertStatus {
  SAFE = 'SAFE',
  ALERTING = 'ALERTING',
  HELP_ON_THE_WAY = 'HELP_ON_THE_WAY',
}

export interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  avatarUrl: string;
}

export interface EmergencyService {
    name: string;
    number: string;
    // Fix: Changed React.ElementType to ElementType and added a type-only import from 'react' to resolve the namespace error.
    icon: ElementType;
}

export interface LogEntry {
  id: number;
  time: string;
  message: string;
  icon: ElementType;
}

export interface CommunityAlert {
  id: number;
  location: string;
  timeAgo: string;
}

export interface SafetyArticle {
  category: string;
  title: string;
  summary: string;
}