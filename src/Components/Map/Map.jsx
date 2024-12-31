import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import NavBar from '../Navbar/Nav';
import { useNavigate } from 'react-router-dom';
import Ai from './ai.jsx';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const cityCoordinates = {
    'Los Angeles': [34.0522, -118.2437],
    'NewYork': [40.7128, -74.0060],
};

export default function MapComponent() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const city = JSON.parse(localStorage.getItem("user")).city;
    const center = cityCoordinates[city] || [34.0522, -118.2437];  

    let user = JSON.parse(localStorage.getItem("user"))
    let navigate = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    })

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${city}`);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, [city]);

    const handleMarkerClick = useCallback((location) => {
        setSelectedLocation(location);
    }, []);

    return (
        <div className="mapCompContainer">
            <NavBar />
            <div className="title-map">
                Pollution Map
            </div>
            <MapContainer center={center} zoom={10} style={{ height: '350px', width: '1000px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[parseFloat(location.lat), parseFloat(location.long)]}
                        eventHandlers={{
                            click: () => handleMarkerClick(location),
                        }}
                    >
                        <Popup>
                            <h2>{location.title}</h2>
                            <p><strong>Agency:</strong> {location.Agency}</p>
                            <p>{location.descrip}</p>
                            <p><strong>Address:</strong> {location.address}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {selectedLocation && (
                <Ai
                    data={{
                        title: selectedLocation.title,
                        Agency: selectedLocation.Agency,
                        descrip: selectedLocation.descrip,
                        address: selectedLocation.address,
                    }}
                />
            )}
        </div>
    );
}
