import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import {Icon} from "leaflet";
import './App.css';

function App() {
  return (
      <MapContainer center={[35, -100]} zoom={4}scrollWheelZoom={true}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
  );
}

export default App;
