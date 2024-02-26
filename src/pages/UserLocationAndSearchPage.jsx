import React from 'react';
import MapDisplayWithMarkers from '../components/UserLocationAndSearch';
import Menu from '../components/Menu';

function UserLocationAndSearchPage() {
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

export default UserLocationAndSearchPage;
