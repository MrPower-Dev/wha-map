import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MyMapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const defaultCenter = { lat: -34.397, lng: 150.644 };
    const defaultZoom = 8;
  
    const handleMapClick = (event) => {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setMarkers([...markers, newMarker]);
    };
  
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAsGezhnsKH6yN6XTA1-L9muKZYAvqfh9M"
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={defaultCenter}
          zoom={defaultZoom}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  };
  
  export default MyMapComponent;
