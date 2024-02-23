import { useState } from 'react';
import MapDisplayWithMarkers from './components/MapDisplayWithMarkers';
import UserLocationAndSearch from './components/UserLocationAndSearch';
import DirectionsFunctionality from './components/DirectionsFunctionality';
import './App.css';

/**
 * Main App component
 * @returns JSX.Element
 */
function App() {
  // create state
  const [showMap, setShowMap] = useState();

  // Function to change the map to display based on type
  const changeShowMap = (type) => {
    //update state
    setShowMap(type)
  };

  return (
    <div className="App">

      {/* Buttons to switch between different map displays */}
      <button onClick={() => changeShowMap(1)} className={showMap === 1 ? 'btn-active' : ''}>
        Map Display with Markers
      </button>
      <button onClick={() => changeShowMap(2)} className={showMap === 2 ? 'btn-active' : ''}>
        User Location and Search
      </button>
      <button onClick={() => changeShowMap(3)} className={showMap === 3 ? 'btn-active' : ''}>
        Directions Functionality
      </button>

      {/* Div to display different map components based on state */}
      <div style={{ textAlign: 'center' }} className={showMap === 1 ? 'visible' : 'hidden'}>
        <h3>Map Display with Markers</h3>
        <MapDisplayWithMarkers />
      </div>
      <div style={{ textAlign: 'center' }} className={showMap === 2 ? 'visible' : 'hidden'}>
        <h3>User Location and Search</h3>
        <UserLocationAndSearch />
      </div>
      <div style={{ textAlign: 'center' }} className={showMap === 3 ? 'visible' : 'hidden'}>
        <h3>Directions Functionality</h3>
        <DirectionsFunctionality />
      </div>
    </div>
  );
}

export default App
