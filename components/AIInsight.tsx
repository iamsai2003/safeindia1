import React, { useState } from 'react';
import { fetchAIInsight } from '../services/geminiService';
import { SparklesIcon } from './Icons';

export const AIInsight: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);

  // Simulated user context for the demo
  const userContext = "I am walking home alone late at night through a poorly lit street.";

  const getInsight = async () => {
    setLoading(true);
    setInsight('');
    const newInsight = await fetchAIInsight(userContext);
    setInsight(newInsight);
    setLoading(false);
    setAnalyzed(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center mb-3">
        <SparklesIcon className="w-6 h-6 text-purple-500 mr-3" />
        <h3 className="font-bold text-gray-800 text-lg">AI Proactive Safety</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Let our AI analyze your current (simulated) situation for potential risks and provide a safety tip.
      </p>
      
      {!analyzed && (
        <button 
          onClick={getInsight} 
          disabled={loading}
          className="w-full flex items-center justify-center p-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze My Situation'}
        </button>
      )}

      {loading && (
        <div className="mt-4 text-center text-sm text-gray-500 animate-pulse">
            <p>Thinking...</p>
        </div>
      )}

      {insight && !loading && (
        <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg animate-fade-in">
          <p className="text-purple-800 font-medium">"{insight}"</p>
          <button 
            onClick={getInsight} 
            disabled={loading}
            className="text-sm mt-3 text-purple-600 hover:text-purple-800 font-semibold disabled:opacity-50"
          >
            Re-analyze
          </button>
        </div>
      )}
    </div>
  );
};