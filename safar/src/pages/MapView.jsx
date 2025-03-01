import React, { useState, useEffect } from 'react';
import FlightSearch from './FlightSearch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';

// Define a custom icon for the aircraft
const aircraftIcon = new L.Icon({
  iconUrl: 'waiting time before and after concession.png', // Ensure you have an aircraft icon image
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

const FlightTracker = () => {
  const [flights, setFlights] = useState([]);
  const [trackedFlight, setTrackedFlight] = useState(null);

  useEffect(() => {
    // Fetch live flight data from OpenSky Network
    const fetchFlights = async () => {
      try {
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();
        setFlights(data.states || []);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 60000); // Refresh data every minute

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (flightNumber) => {
    const flight = flights.find((f) => f[1].trim() === flightNumber.trim());
    setTrackedFlight(flight || null);
  };

  return (
    <div>
      <Navbar />
      <FlightSearch onSearch={handleSearch} />
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trackedFlight && (
          <Marker
            position={[trackedFlight[6], trackedFlight[5]]} // Latitude and Longitude
            icon={aircraftIcon}
          >
            <Popup>
              <div>
                <p><strong>Callsign:</strong> {trackedFlight[1]}</p>
                <p><strong>Origin Country:</strong> {trackedFlight[2]}</p>
                <p><strong>Velocity:</strong> {trackedFlight[9]} m/s</p>
                <p><strong>Altitude:</strong> {trackedFlight[13]} m</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default FlightTracker;
