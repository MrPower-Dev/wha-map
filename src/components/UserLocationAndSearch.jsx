import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, InfoWindow, LoadScript } from '@react-google-maps/api';

// Styling for the map container
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};


const UserLocationAndSearch = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user's current location when component mounts
  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting geolocation:', error);
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  }, []);

  // Callback function when the map loads
  const onMapLoad = mapInstance => {
    setMap(mapInstance);
  };

  // Callback function when the map is clicked
  const onMapClick = event => {
    setSelectedPlace(null);
  };

  // Function to handle search when the search query changes
  const onPlacesChanged = () => {
    if (map) {
      const placesService = new window.google.maps.places.PlacesService(map);

      placesService.textSearch(
        {
          query: searchQuery,
          location: userLocation,
          radius: 5000 // in meters
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(results);
          } else {
            console.error('Error fetching places:', status);
          }
        }
      );
    }
  };

  return (
    <div>
			{/* Input field for searching places */}
      <input
        type="text"
        placeholder="Search for places..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
				className="form-control"
      />

      {/* Button to trigger place search */}
			<button onClick={onPlacesChanged}>Search</button>

      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={["places"]} // Add your required libraries here
      >
        {/* Google Map component */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
          zoom={14}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          {/* Marker for user's current location */}
          {userLocation && <MarkerF position={userLocation} />}
          {/* Markers for search results */}
          {places.map(place => (
            <MarkerF
              key={place.place_id}
              position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
          {/* Info window for selected place */}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
	)
};

export default UserLocationAndSearch;
