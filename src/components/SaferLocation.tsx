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
    <div className="min-h-screen bg-[#FDF8F3] py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location Input Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
          <h2 className="text-3xl font-extrabold text-black mb-8 relative">
            Find Safer Routes
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-indigo-700 transform origin-left transition-all duration-300 group-hover:w-full"></span>
          </h2>

          {/* Pickup Location */}
          <div className="mb-6 transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Pickup Location
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3 h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-indigo-600" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="pl-12 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter pickup location"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>

          {/* Destination */}
          <div className="mb-8 transform transition-all duration-300 hover:translate-x-1">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Destination
            </label>
            <div className="relative group">
              <Navigation className="absolute left-3 top-3 h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-indigo-600" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-12 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter destination"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>

          <button className="w-full bg-indigo-700 text-white py-4 rounded-lg text-lg font-bold relative overflow-hidden group transition-all duration-300 hover:shadow-lg transform hover:translate-y-[-2px]">
            <span className="relative z-10">Find Safe Route</span>
            <div className="absolute inset-0 bg-indigo-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>

        {/* Map Section */}
        <div className="rounded-xl shadow-lg overflow-hidden h-[600px] transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
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
    </div>
  );
}

export default App;