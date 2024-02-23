import React, { useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
	lat: 13.6518526,
	lng: 100.6407203,
};

const DirectionsFunctionality = () => {
// const DirectionsFunctionality = ({ origin, destination }) => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('เมกา บางนา');
  const [destination, setDestination] = useState('วัดกิ่งแก้ว');

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.error('response: ', response);
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="origin"
        value={origin}
        onChange={e => setOrigin(e.target.value)}
        className="form-control"
      />
      <input
        type="text"
        placeholder="destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="form-control"
      />

      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={(maps) => ({ minZoom: 12, maxZoom: 17, clickableIcons: false, })}
        >
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          {response && <DirectionsRenderer directions={response} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default DirectionsFunctionality;
