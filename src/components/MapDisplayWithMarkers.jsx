import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const MapDisplayWithMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // useEffect hook to load markers on component mount
  useEffect(() => {
    const abortController = new AbortController();

    const loadMarker = async () => {
      try {
        
        // Send GET request to fetch markers
        const response = await axios.get(process.env.WHA_API_URL, {
          signal: abortController.signal,
        });

        // Check if response is successful and contains data
        if (response.status === 200 && response.data.data.length > 0) {
          const data = response.data.data.map(location => ({
            name: location.location_name, 
            lat: parseFloat(location.lat), 
            lng: parseFloat(location.lng) 
          }));
          setMarkers(data);
        }

      } catch (error) {
        // Handle error
        console.error("Something went wrong", error)
      }
    }

    // Call the loadMarkers function
    loadMarker(); 
    return () => abortController.abort();

  }, [])

  // Function to handle map click event
  const onMapClick = async (event) => {
    // Geocode the clicked position
    geoCode({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }).then(response => {

      // Create a new marker object with the geocoded address
      const newMarker = {
        name: response,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      // Send API request to insert marker data
      insertMarker(newMarker)
      .then(() => {
        // If insertion is successful, update markers state with the new marker
        setMarkers(current => [...current, newMarker]);
      })
      .catch(error => {
        // Handle error
        console.error('Error insert marker:', error);
      });
    })
    .catch(error => {
      // Handle error
      console.error('Error geoCode marker:', error);
    });
  };

  // Function to remove a marker
  const removeMarker = (markerToRemove) => {
    // Send API request to delete marker data
    deleteMarker(markerToRemove)
    .then(() => {
      // If delete is successful, remove the marker from markers state
      setMarkers((current) =>
        current.filter((marker) => marker !== markerToRemove)
      );
      // If the selected marker is the one being removed, clear the selectedMarker state
      if (selectedMarker === markerToRemove) {
        setSelectedMarker(null);
      }
    })
    .catch(error => {
      // Handle error
      console.error('Error delete marker:', error);
    });
  };

  // Function to geocode a marker position
  const geoCode = async (marker) => {
    try {
      const abortController = new AbortController();

      // Send GET request to geocode the marker position
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`, {
        signal: abortController.signal,
      });
      // Extract location name from the response
      let locationName = '';
      if (response.status === 200 && response.data.results.length > 0) {
        locationName = response.data.results[0].formatted_address;
      }
      return locationName;
    } catch (error) {
      // Handle error
      console.error('Error geoCode marker:', error);
    }
  };

  // Function to insert a new marker
  const insertMarker = async (marker) => {
    try {
      const abortController = new AbortController();

      const dataMarker = {
        location_name: marker.name,
        lat: marker.lat,
        lng: marker.lng
      };

      // Send POST request to insert the marker
      await axios.post(process.env.WHA_API_URL, dataMarker, {
        signal: abortController.signal,
      });

    } catch (error) {
      // Handle error
      console.error('Error insert marker:', error);
    }
  };
  
  // Function to delete a marker
  const deleteMarker = async (marker) => {
    try {
      const abortController = new AbortController();

      // Send DELETE request to delete the marker
      await axios.delete(`${process.env.WHA_API_URL}/${marker.lat}/${marker.lng}`, {
        signal: abortController.signal,
      });

    } catch (error) {
      // Handle error
      console.error('Error delete marker:', error);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '400px',
        }}
        zoom={12}
        center={{
          lat: 13.6518526,
          lng: 100.6407203,
        }}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h2>{selectedMarker.name}</h2>
              <p>Location: {selectedMarker.lat}, {selectedMarker.lng}</p>
              <button onClick={() => removeMarker(selectedMarker)}>
                Remove Marker
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplayWithMarkers;
