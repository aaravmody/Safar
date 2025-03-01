import React, { useState } from 'react';

const FlightSearch = ({ onSearch }) => {
  const [flightNumber, setFlightNumber] = useState('');

  const handleSearch = () => {
    onSearch(flightNumber);
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
      <input
        type="text"
        placeholder="Enter Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Track Flight</button>
    </div>
  );
};

export default FlightSearch;
