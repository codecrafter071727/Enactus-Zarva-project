import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import axios from "axios";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface RouteData {
  route: [number, number][];
  Duration: string;
  Distance: string;
}

// More distinctive map style
const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8ec3b9" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1a3646" }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }]
  }
];

const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjhuWZztdK2U2wWaGAyvgS5DxTCqi8kmg&libraries=places`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

function App() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.Polyline | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ duration: string; distance: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [Load, setLoad] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions: google.maps.MapOptions = {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 12,
        mapTypeId: "roadmap",
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false, // Disabled to keep interface cleaner
        scaleControl: true,
        streetViewControl: false, // Disabled to keep interface cleaner
        rotateControl: false, // Disabled to keep interface cleaner
        fullscreenControl: true,
        backgroundColor: '#1d2c4d' // Match with style background
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      setMapInstance(map);
    };

    loadGoogleMapsScript(() => {
      initializeMap();
    });
  }, []);

  // Fetch safer routes
  const fetchSaferRoute = async () => {
    setLoad(true);
    if (!pickup || !destination) return;

    try {
      const response = await axios.post<RouteData>("https://enactus-zarva-project.onrender.com/v1/api/carRoute", {
        origin: pickup,
        destination: destination,
      });

      const data = response.data;
      setRouteInfo({
        duration: data.Duration,
        distance: data.Distance,
      });

      const routeCoordinates = data.route.map(([lng, lat]) => ({ lat, lng }));

      if (routePath) {
        routePath.setMap(null);
      }

      if (mapInstance && routeCoordinates.length > 0) {
        const newRoutePath = new google.maps.Polyline({
          path: routeCoordinates,
          geodesic: true,
          strokeColor: "#FF850A",
          strokeOpacity: 1.0,
          strokeWeight: 4,
        });

        newRoutePath.setMap(mapInstance);
        setRoutePath(newRoutePath);
        mapInstance.setCenter(routeCoordinates[0]);
        mapInstance.setZoom(12);
        setLoad(false);
      }
    } catch (err) {
      setError("Failed to fetch safe route. Please try again.");
    }
  };

  // Live GPS Tracking
  const toggleLiveTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    } else {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPickup(`${latitude},${longitude}`);
          if (mapInstance) {
            const newCenter = new google.maps.LatLng(latitude, longitude);
            mapInstance.setCenter(newCenter);
            mapInstance.setZoom(16);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Error getting location: " + error.message);
        },
        { enableHighAccuracy: true }
      );
      setWatchId(id);
    }
  };

  return (
    <div
    className="min-h-screen py-8"
    style={{
      background: "linear-gradient(45deg, #4A4A29, #9C9A6A, #B5B1A8, #2E3A47)",
      backgroundSize: "400% 400%",
      animation: "gradient-x 15s ease infinite",
    }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        <div className="bg-gray-900/80 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-[#d5c58a] mb-8">Find Safer Routes</h2>
          <button
            onClick={toggleLiveTracking}
            className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded"
          >
            {watchId ? "Stop Live Tracking" : "Start Live Tracking"}
          </button>
          <div className="mb-6">
            <label className="block text-lg mb-2">Pickup Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-4 border rounded bg-gray-800 text-[#d5c58a]"
              placeholder="Enter pickup location"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 border rounded bg-gray-800 text-[#d5c58a]"
              placeholder="Enter destination"
            />
          </div>
          <button
            onClick={fetchSaferRoute}
            className="w-full bg-green-600 text-white py-2 px-4 rounded"
          >
            Find Route
          </button>
          <h1 className="text-2xl text-white text-center py-2">{Load? "Loading,,," : ""}</h1>
        </div>
        <div className="relative h-96">
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
