import React, { useState, useEffect, ElementType } from 'react';
import { fetchSafetyArticles } from '../services/geminiService';
import { SafetyArticle } from '../types';
import { BookOpenIcon, GlobeAltIcon, DevicePhoneMobileIcon, ShieldCheckIcon } from './Icons';

// Helper to map category names to icons and styles
const getCategoryStyle = (category: string): { Icon: ElementType; color: string } => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('digital') || lowerCategory.includes('online')) {
        return { Icon: DevicePhoneMobileIcon, color: 'blue' };
    }
    if (lowerCategory.includes('travel') || lowerCategory.includes('urban')) {
        return { Icon: GlobeAltIcon, color: 'purple' };
    }
    if (lowerCategory.includes('awareness') || lowerCategory.includes('general')) {
        return { Icon: ShieldCheckIcon, color: 'green' };
    }
    return { Icon: BookOpenIcon, color: 'rose' }; // Default
};


export const SafetyFeed: React.FC = () => {
  const [articles, setArticles] = useState<SafetyArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getArticles = async () => {
    setLoading(true);
    const newArticles = await fetchSafetyArticles();
    setArticles(newArticles);
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const renderSkeleton = () => (
    <div className="p-4 bg-white rounded-xl shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Safety & Awareness Feed</h3>
        {loading ? (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => renderSkeleton())}
            </div>
        ) : (
            <div className="space-y-4">
                {articles.map((article, index) => {
                    const { Icon, color } = getCategoryStyle(article.category);
                    return (
                        <div key={index} className={`p-4 bg-gray-50 border-l-4 border-${color}-500 rounded-r-lg animate-fade-in`}>
                            <div className="flex items-center text-sm font-bold text-${color}-600 mb-2">
                                <Icon className={`w-5 h-5 mr-2 text-${color}-500`} />
                                <span>{article.category}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">{article.title}</h4>
                            <p className="text-gray-600 text-sm">{article.summary}</p>
                        </div>
                    );
                })}
            </div>
        )}
         <button 
            onClick={getArticles} 
            disabled={loading}
            className="w-full text-center mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Loading...' : 'Load More Articles'}
        </button>
    </div>
  );
};