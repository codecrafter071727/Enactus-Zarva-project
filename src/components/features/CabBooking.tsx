import React, { useState } from 'react';
import { ArrowLeft, Car, MapPin } from 'lucide-react';

const cabCompanies = [
  { id: 1, name: 'SafeRide', rating: 4.8, eta: '5 mins' },
  { id: 2, name: 'WomenDrive', rating: 4.9, eta: '8 mins' },
  { id: 3, name: 'SecureCab', rating: 4.7, eta: '3 mins' },
];

export function CabBooking({ onBack }: { onBack: () => void }) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showCompanies, setShowCompanies] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCompanies(true);
  };

  const handleBookCab = (companyId: number) => {
    console.log('Booking cab from company:', companyId);
    // Here you would integrate with the cab company's API
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
        <h3 className="text-2xl font-bold mb-6">Book a Secure Cab</h3>

        {!showCompanies ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <input
                type="text"
                id="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter pickup location"
              />
            </div>

            <div>
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off Location
              </label>
              <input
                type="text"
                id="dropoff"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter drop-off location"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Cabs
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">Available Cabs Nearby</h4>
            {cabCompanies.map((company) => (
              <div
                key={company.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer"
                onClick={() => handleBookCab(company.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-lg">{company.name}</h5>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-4">Rating: {company.rating}⭐</span>
                      <span>ETA: {company.eta}</span>
                    </div>
                  </div>
                  <Car className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowCompanies(false)}
              className="w-full mt-4 border border-purple-600 text-purple-600 px-6 py-3 rounded-full hover:bg-purple-50 transition"
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}