import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

export function SafeRoute({ onBack }: { onBack: () => void }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with a mapping service API
    console.log('Finding safe route between:', origin, 'and', destination);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-purple-600 mb-6 hover:text-purple-700 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Features
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Find Safe Routes</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Point
            </label>
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your starting location"
            />
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your destination"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Safe Route
          </button>
        </form>

        <div className="mt-8 bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
        </div>
      </div>
    </div>
  );
}