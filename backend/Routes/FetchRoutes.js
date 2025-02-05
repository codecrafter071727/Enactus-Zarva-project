    import express from "express";
    import dotenv from "dotenv";
    import axios from "axios";

    dotenv.config();

    const SafeRouter = express.Router();
    const OSM_API_KEY = process.env.OSM_API_KEY; // OpenRouteService API Key
    const GEO_API_KEY = process.env.GEO_API_KEY; // Geocoding API Key (e.g., Mapbox, OpenCage)
    const SAFE_ROUTE_THRESHOLD = process.env.SCORE;


    console.log("OpenRouteService API Key:", OSM_API_KEY);
    console.log("Geocoding API Key:", GEO_API_KEY);

    // Helper function to geocode a location name to coordinates
    const geocodeLocation = async (location) => {
        try {
            const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
                params: {
                    q: location,
                    key: GEO_API_KEY,
                },
            });

            const { results } = response.data;
            if (results.length === 0) {
                throw new Error("Location not found");
            }

            const { lat, lng } = results[0].geometry;
            return `${lng},${lat}`; // Return in longitude,latitude format
        } catch (error) {
            console.error(`Error geocoding location "${location}":`, error.message);
            throw new Error("Failed to geocode location");
        }
    };


    const filterRoute = async (originCoordinates, destinationCoordinates) => {
        let safeRoute = [];

        // Split the origin and destination coordinates into latitude and longitude
        const [originLng, originLat] = originCoordinates.split(',').map(parseFloat);
        const [destLng, destLat] = destinationCoordinates.split(',').map(parseFloat);

        // Fetch safety data for origin and destination
        const originPopudensity = await getPopudensity(originLat, originLng);
        const destPopudensity = await getPopudensity(destLat, destLng);




        // Calculate safety scores for origin and destination
        const originScore = calculateScore(originPopudensity);
        const destScore = calculateScore(destPopudensity);

        const averageScore = (originScore + destScore) / 2;

    // Check if score meets threshold
    if (averageScore >= SAFE_ROUTE_THRESHOLD) {
        safeRoute.push({
            origin: originCoordinates,
            destination: destinationCoordinates,
            safetyScore: averageScore,
        });
    }

    return safeRoute.length ? safeRoute : null;
    };


    const getCrimeRate = (coordinates)=>{}

    const getPopudensity = async (latitude, longitude) => {
        try {
            const overpassQuery = `
                [out:json];
                node(around:1000, ${latitude}, ${longitude})["population"];
                out body;
            `;

            const response = await axios.post("https://overpass-api.de/api/interpreter", overpassQuery, {
                headers: {
                    "Content-Type": "text/plain",
                },
            });

            const populationData = response.data.elements[0]?.tags?.population;
            console.log("Population density :", populationData);
            return populationData || 0; // Return population or a default value
        } catch (error) {
            console.error("Error fetching population density from Overpass API:", error.message);
            return 0; // Return a default value if the API fails
        }
    };

    const getRoadCondition = (coordinates)=>{}

    const calculateScore = (popudensity)=>{
        let score = 0
        if(popudensity<=1000){
            score+=30
        }
        else if(popudensity >1000 && popudensity <5000 ){
            score += 20
        }
        else{
            score += 20
        }

        return Math.min(Math.max(score, 0),100)
    }



    const getRouteCar = async (req, res) => {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origin and destination are required." });
        }

        try {
            // Geocode both origin and destination to coordinates
            const originCoordinates = await geocodeLocation(origin);
            const destinationCoordinates = await geocodeLocation(destination);

            console.log("Origin Coordinates:", originCoordinates);
            console.log("Destination Coordinates:", destinationCoordinates);

            // Fetch the route from Mapbox Directions API
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates};${destinationCoordinates}`, {
                params: {
                    access_token: process.env.MAP_BOX_API, // Use your Mapbox API key
                    geometries: "geojson", // Get route geometry in GeoJSON format
                    overview: "full", // Get full route overview
                },
            });

            const routes = response.data.routes;

            if (!routes || !routes.length) {
                return res.status(404).json({ error: "No routes found." });
            }

            const routeCoordinates = routes[0].geometry.coordinates; // Extract route coordinates
            const distance = routes[0].distance / 1000; // Convert meters to kilometers
            const duration = routes[0].duration; // Duration in seconds

            const HR = duration / 3600;
            const MIN = (duration % 3600) / 60;


            return res.status(200).json({
                Distance: `${Math.round(distance)} km`,
                Duration: `${Math.round(HR)} hr, ${Math.round(MIN)} min`,
                route: routeCoordinates,
             
            });
        } catch (error) {
            console.error("Error fetching routes:", error.response?.data || error.message);
            return res.status(500).json({
                error: error.response?.data?.message || "Failed to fetch route.",
            });
        }
    };


    const getRouteBike = async (req, res) => {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origin and destination are required." });
        }

        try {
            // Geocode both origin and destination to coordinates
            const originCoordinates = await geocodeLocation(origin);
            const destinationCoordinates = await geocodeLocation(destination);

            const response = await axios.get("https://api.openrouteservice.org/v2/directions/cycling-regular", {
                headers: {
                    Authorization: OSM_API_KEY,
                },
                params: {
                    start: originCoordinates,
                    end: destinationCoordinates,
                },
            });

            
            const routes = response.data.features;

            if (!routes || !routes.length) {
                return res.status(404).json({ error: "No routes found." });
            }

            const routeCoordinates = routes[0]?.geometry?.coordinates;
            
            if (!routeCoordinates) {
                return res.status(404).json({ error: "Route geometry is missing." });
            }

            const segments = routes[0]?.properties?.segments;

    if (!segments || !segments.length) {
        return res.status(404).json({ error: "No segments found in the route." });
    }

    const safeRoutes = await filterRoute(routeCoordinates, segments);
    if(!safeRoutes)
    {
        console.log("No safe Routes..");
        res.send("No safe Routes...");
    }




    const distance = await  segments[0].distance/1000; // Accessing distance from the first segment

    const duration = await segments[0].duration;

    const HR = duration/3600;
    const MIN = duration/60;



    if (distance === undefined) {
    return res.status(404).json({ error: "Distance data is missing." });
    }

    console.log(routes);
    return res.status(200).json({ Distance : `${Math.round(distance)} km`, Duration : `${Math.round(HR)} hr, ${Math.round(MIN)} min`, route : routeCoordinates, SafeRoutes : safeRoutes});
            
        } catch (error) {
            console.error("Error fetching routes:", error.response?.data || error.message);
            return res.status(500).json({
                error: error.response?.data?.error?.message || "Failed to fetch route.",
            });
        }
    };


    const getRouteWalk = async (req, res) => {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origin and destination are required." });
        }

        try {
            // Geocode both origin and destination to coordinates
            const originCoordinates = await geocodeLocation(origin);
            const destinationCoordinates = await geocodeLocation(destination);

            const response = await axios.get("https://api.openrouteservice.org/v2/directions/foot-walking", {
                headers: {
                    Authorization: OSM_API_KEY,
                },
                params: {
                    start: originCoordinates,
                    end: destinationCoordinates,
                },
            });

            
            const routes = response.data.features;

            if (!routes || !routes.length) {
                return res.status(404).json({ error: "No routes found." });
            }

            const routeCoordinates = routes[0]?.geometry?.coordinates;
            
            if (!routeCoordinates) {
                return res.status(404).json({ error: "Route geometry is missing." });
            }

            const segments = routes[0]?.properties?.segments;

    if (!segments || !segments.length) {
        return res.status(404).json({ error: "No segments found in the route." });
    }

    const safeRoutes = await filterRoute(routeCoordinates, segments);
    if(!safeRoutes)
    {
        console.log("No safe Routes..");
        res.send("No safe Routes...");
    }




    const distance = await  segments[0].distance/1000; // Accessing distance from the first segment

    const duration = await segments[0].duration;

    const HR = duration/3600;
    const MIN = duration/60;



    if (distance === undefined) {
    return res.status(404).json({ error: "Distance data is missing." });
    }

    console.log(routes);
    return res.status(200).json({ Distance : `${Math.round(distance)} km`, Duration : `${Math.round(HR)} hr, ${Math.round(MIN)} min`, route : routeCoordinates, SafeRoutes : safeRoutes});
            
        } catch (error) {
            console.error("Error fetching routes:", error.response?.data || error.message);
            return res.status(500).json({
                error: error.response?.data?.error?.message || "Failed to fetch route.",
            });
        }
    };


    // Define the route
    SafeRouter.post("/carRoute", getRouteCar);
    SafeRouter.post("/bikeRoute", getRouteBike);
    SafeRouter.post("/walkRoute", getRouteWalk);
    export default SafeRouter;