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

const App = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.Polyline | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ duration: string; distance: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const lastPositionRef = useRef<google.maps.LatLng | null>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "googleMapsScript";
    const initializeMap = () => {
      if (!window.google?.maps?.Map || !mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.209 },
        zoom: 12,
        mapTypeId: "roadmap",
      });

      const marker = new google.maps.Marker({
        map,
        icon: getArrowIcon(0),
        visible: false,
      });

      setMapInstance(map);
      markerRef.current = marker;
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjhuWZztdK2U2wWaGAyvgS5DxTCqi8kmg&libraries=geometry,places`;
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else if (window.google?.maps) {
      initializeMap();
    }

    return () => {
      const script = document.getElementById(scriptId);
      script?.remove();
    };
  }, []);

  const getArrowIcon = (rotation: number) => ({
    path: "M 0,-2 L 2,2 L -2,2 Z",
    scale: 7,
    fillColor: "#FF0000",
    fillOpacity: 1,
    strokeColor: "#000000",
    strokeWeight: 1,
    rotation,
    anchor: new google.maps.Point(0, 0),
  });

  const fetchSaferRoute = async () => {
    let origin = pickup;

    if (!origin) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        origin = `${position.coords.latitude},${position.coords.longitude}`;
        setPickup(origin);
      } catch {
        setError("Please allow location access or enter a pickup location.");
        return;
      }
    }

    if (!destination) {
      setError("Please enter a destination");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<RouteData>(
        "http://localhost:3000/v1/api/carRoute",
        { origin, destination }
      );

      const data = response.data;
      setRouteInfo({
        duration: data.Duration,
        distance: data.Distance,
      });

      const routeCoordinates = data.route.map(([lng, lat]) => ({ lat, lng }));

      if (routePath) routePath.setMap(null);

      if (mapInstance && routeCoordinates.length > 0) {
        const newRoutePath = new google.maps.Polyline({
          path: routeCoordinates,
          geodesic: true,
          strokeColor: "#2ecc71",
          strokeOpacity: 2.0,
          strokeWeight: 5,
        });

        newRoutePath.setMap(mapInstance);
        setRoutePath(newRoutePath);

        // Fit the map to the route
        const bounds = new google.maps.LatLngBounds();
        routeCoordinates.forEach(coord => bounds.extend(coord));
        mapInstance.fitBounds(bounds);

        // Switch to fullscreen
        if (mapRef.current) {
          if (mapRef.current.requestFullscreen) {
            mapRef.current.requestFullscreen();
          } else if (mapRef.current.webkitRequestFullscreen) { // Safari
            mapRef.current.webkitRequestFullscreen();
          } else if (mapRef.current.msRequestFullscreen) { // IE11
            mapRef.current.msRequestFullscreen();
          }
        }

        // Update the info bar with route information
        if (infoBarRef.current) {
          infoBarRef.current.innerHTML = `
            <strong>Route Info</strong><br>
            Distance: ${data.Distance}<br>
            Duration: ${data.Duration}
          `;
          infoBarRef.current.style.display = 'block'; // Show the info bar
        }
      }
    } catch {
      setError("Failed to fetch safe route. Please check your inputs and try again.");
      setRouteInfo(null);
      if (routePath) routePath.setMap(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecenter = () => {
    if (routePath && mapInstance) {
      const path = routePath.getPath();
      const coordinates = path.getArray();
      
      if (coordinates.length > 0) {
        const startPoint = coordinates[0];
        const nextPoint = coordinates.length > 1 ? coordinates[1] : startPoint;

        const heading = window.google.maps.geometry.spherical.computeHeading(startPoint, nextPoint);

        mapInstance.setOptions({
          center: startPoint,
          zoom: 16,
          heading: heading,
          tilt: 45,
        });
      }
    }
  };

  const toggleLiveTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      if (markerRef.current) markerRef.current.setVisible(false);
    } else {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading, speed } = position.coords;
          const newPos = new google.maps.LatLng(latitude, longitude);

          let rotationAngle = markerRef.current?.getIcon()?.rotation || 0;

          if (speed > 0.5 && typeof heading === "number" && !isNaN(heading)) {
            rotationAngle = heading;
          } else if (lastPositionRef.current && !newPos.equals(lastPositionRef.current)) {
            rotationAngle = google.maps.geometry.spherical.computeHeading(lastPositionRef.current, newPos);
          }

          if (markerRef.current) {
            markerRef.current.setIcon(getArrowIcon(rotationAngle));
            markerRef.current.setPosition(newPos);
            markerRef.current.setVisible(true);
          }

          if (mapInstance) mapInstance.panTo(newPos);
          lastPositionRef.current = newPos;
          setPickup(`${latitude},${longitude}`);
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
      className="min-h-screen py-8 bg-gradient-to-br from-[#615839] via-gray-900 to-[#736638] " >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900/80 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-[#d5c58a] mb-8">Find Safer Routes</h2>

          <button
            onClick={toggleLiveTracking}
            className="mb-4 w-full bg-[#988b5e] hover:bg-[#60583c] text-white py-2 px-4 rounded transition-colors"
          >
            {watchId ? "Stop Live Tracking" : "Start Live Tracking"}
          </button>

          <div className="mb-6 text-white">
            <label className="block text-lg mb-2">Pickup Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full p-4 border rounded bg-gray-800 text-[#d5c58a] focus:outline-none focus:ring-2 focus:ring-[#d5c58a]"
                placeholder="Enter pickup or use current location"
              />
              <button
                onClick={async () => {
                  try {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                      navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    setPickup(`${position.coords.latitude},${position.coords.longitude}`);
                  } catch {
                    setError("Could not get your current location. Please allow location access.");
                  }
                }}
                className="px-4 py-2 bg-[#7b724f] rounded hover:bg-[#554d32] transition-colors"
                title="Use current location"
              >
                📍
              </button>
            </div>
          </div>

          <div className="mb-6 text-white">
            <label className="block text-lg mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 border rounded bg-gray-800 text-[#d5c58a] focus:outline-none focus:ring-2 focus:ring-[#d5c58a]"
              placeholder="Enter destination"
            />
          </div>

          <button
            onClick={fetchSaferRoute}
            disabled={loading}
            className="w-full bg-[#6a5c29] hover:bg-[#584e2c] text-white py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Find Route"}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-800/50 text-red-300 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
          <div ref={mapRef} className="w-full h-full"></div>
          <div
            ref={infoBarRef}
            className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center"
            style={{ display: 'none' }} // Hidden by default, show when route is found
          ></div>
          <button
            onClick={handleRecenter}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-md shadow-md transition-colors flex items-center gap-1"
            title="Recenter map to route start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4a1 1 0 010 2H6v10h4a1 1 0 110 2H6a2 2 0 01-2-2V4zm12 6a1 1 0 011 1v3a2 2 0 01-2 2h-4a1 1 0 110-2h4V8h-4a1 1 0 110-2h4a2 2 0 012 2v3a1 1 0 01-1 1z"
                clipRule="evenodd"
              />
            </svg>
            Recenter
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;