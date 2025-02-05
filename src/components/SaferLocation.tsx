import React, { useState, useEffect, useRef } from 'react';

// Add this declaration to extend the window object
declare global {
  interface Window {
    google: typeof google;
  }
}

const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.id = 'googleMaps';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
import { MapPin, Navigation } from 'lucide-react';

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [mapUrl, setMapUrl] = useState('https://www.google.com/maps/embed/v1/place?key=AIzaSyALQLhxgvllyOzJiTgr467C8u3oUPtr_Rk&q=New+Delhi,India');
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = async () => {
      try {
        const { Map } = window.google.maps;

        // Initialize map
        const map = new Map(mapRef.current, {
          center: { lat: 28.6139, lng: 77.2090 }, // New Delhi coordinates
          zoom: 12,
        });

        setMapInstance(map);

        // You can add the App Check implementation here if needed
        // const app = initializeApp({
        //   // Your firebase configuration object
        // });
        
        // const appCheck = initializeAppCheck(app, {
    loadGoogleMapsScript(() => {
      // Only initialize if the ref is available
      if (mapRef.current) {
        initializeMap();
      }
    });
        // });

        // Settings.getInstance().fetchAppCheckToken = () =>
        //     getToken(appCheck, false);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Only initialize if the ref is available
    if (mapRef.current) {
      initializeMap();
    }
  }, []);

  // Existing useEffect for iframe URL updates (keeping as fallback)
  useEffect(() => {
    if (pickup && destination) {
      const directions = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyALQLhxgvllyOzJiTgr467C8u3oUPtr_Rk&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`;
      setMapUrl(directions);
    } else if (pickup) {
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyALQLhxgvllyOzJiTgr467C8u3oUPtr_Rk&q=${encodeURIComponent(pickup)}`);
    } else if (destination) {
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyALQLhxgvllyOzJiTgr467C8u3oUPtr_Rk&q=${encodeURIComponent(destination)}`);
    }
  }, [pickup, destination]);

  return (
    <div
      className="min-h-screen py-8"
      style={{
        background: 'linear-gradient(45deg, #4A4A29, #9C9A6A, #B5B1A8, #2E3A47)',
        backgroundSize: '400% 400%',
        animation: 'gradient-x 15s ease infinite',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location Input Section */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-[#d5c58a]/20 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
          <h2 className="text-3xl font-extrabold text-[#d5c58a] mb-8 relative">
            Find Safer Routes
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-[#d0c085] transform origin-left transition-all duration-300 group-hover:w-full"></span>
          </h2>

          {/* Pickup Location */}
          <div className="mb-6 transform transition-all duration-300 hover:translate-x-1 group">
            <label className="block text-lg font-semibold text-[#d5c58a] mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-[#d0c085]" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-12 w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-[#d5c58a] focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                placeholder="Enter pickup location"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d0c085] transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>

          {/* Destination */}
          <div className="mb-8 transform transition-all duration-300 hover:translate-x-1 group">
            <label className="block text-lg font-semibold text-[#d5c58a] mb-2">
              Destination
            </label>
            <div className="relative">
              <Navigation className="absolute left-3 top-3 h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-[#d0c085]" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-12 w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-[#d5c58a] focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
                placeholder="Enter destination"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d0c085] transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#d0c085] to-[#c0b075] text-black py-4 rounded-lg text-lg font-bold relative overflow-hidden group transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-2px]">
            <span className="relative z-10">Find Safe Route</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c0b075] to-[#d0c085] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>

        {/* Map Section */}
        <div className="rounded-xl shadow-lg overflow-hidden h-[600px] transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-[#d5c58a]/20 bg-gray-900/80 backdrop-blur-lg">
          {/* Primary Google Maps JS API div */}
          <div
            ref={mapRef}
            className="w-full h-full rounded-xl"
            style={{ display: mapInstance ? 'block' : 'none' }}
          />
          {/* Fallback iframe map */}
          {!mapInstance && (
            <iframe
              width="100%"
              height="100%"
              className="rounded-xl"
              frameBorder="0"
              style={{ border: 0 }}
              src={mapUrl}
              allowFullScreen
            />
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;