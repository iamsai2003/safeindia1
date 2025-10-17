import React, { useState } from 'react';
import { Contact } from '../types';
import { UserIcon, PhoneIcon, LinkIcon, XMarkIcon } from './Icons';

interface AddContactFormProps {
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id' | 'avatarUrl'>) => void;
}

export const AddContactForm: React.FC<AddContactFormProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relation || !phone) {
      setError('All fields are required.');
      return;
    }
    // Basic phone validation for demo
    if (!/^\+?[0-9\s]{10,15}$/.test(phone)) {
        setError('Please enter a valid phone number.');
        return;
    }
    setError('');
    onSave({ name, relation, phone });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Trusted Contact</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Anjali Sharma"
              />
            </div>
          </div>
          <div>
            <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LinkIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mother, Friend"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., +91 98765 43210"
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};