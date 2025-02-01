import React, { useState } from 'react';
import { MapPin, Navigation, Shield, Car, Mic, Bell, Users, Clock } from 'lucide-react';

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-bold text-black">Zarva</span>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center text-black">
                <Car className="h-5 w-5 mr-1" />
                <span>Safer Cabs</span>
              </div>
              <div className="flex items-center text-black">
                <Mic className="h-5 w-5 mr-1" />
                <span>Voice Recognition</span>
              </div>
              <div className="flex items-center text-black font-semibold">
                <Navigation className="h-5 w-5 mr-1" />
                <span>Safer Routes</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Features Overview */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-black" />
              <div>
                <h3 className="font-semibold text-black">Real-time Alerts</h3>
                <p className="text-sm text-gray-600">Instant notifications about route safety</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-black" />
              <div>
                <h3 className="font-semibold text-black">Community Verified</h3>
                <p className="text-sm text-gray-600">Routes rated by local community</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-black" />
              <div>
                <h3 className="font-semibold text-black">24/7 Monitoring</h3>
                <p className="text-sm text-gray-600">Continuous safety updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-black mb-6">Find Safer Routes</h2>
            
            {/* Pickup Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter pickup location"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter destination"
                />
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
              Find Safe Route
            </button>

            {/* Safety Features */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-black mb-4">Safety Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Real-time safety alerts
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Well-lit route priority
                </li>
                <li className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  24/7 route monitoring
                </li>
              </ul>
              
              {/* Additional Safety Content */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your safety is our top priority. Our intelligent routing system analyzes multiple data points including street lighting, crime statistics, and real-time community reports to suggest the safest possible route for your journey. With over 100,000 verified safe routes and a growing community of users, Zarva ensures you reach your destination with peace of mind.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="bg-white p-3 rounded-md">
                    <div className="font-bold text-black">100k+</div>
                    <div className="text-gray-600">Safe Routes</div>
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <div className="font-bold text-black">98%</div>
                    <div className="text-gray-600">User Safety Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section (Placeholder) */}
          <div className="md:col-span-2 bg-gray-100 rounded-lg shadow-md min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Map will be integrated here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;