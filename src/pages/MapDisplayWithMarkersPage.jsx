import React from 'react';
import MapDisplayWithMarkers from '../components/MapDisplayWithMarkers';
import Menu from '../components/Menu';

function MapDisplayWithMarkersPage() {
  return (
    <div>
      <Menu />
      <div style={{ textAlign: 'center' }}>
        <h3>Map Display with Markers</h3>
        <MapDisplayWithMarkers />
      </div>
    </div>
  );
}

export default MapDisplayWithMarkersPage;
