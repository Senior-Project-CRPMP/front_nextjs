import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface MapProps {
  position: [number, number]; // Interface for map position
}

export default function Map({ position }: MapProps) {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      {" "}
      {/* Adjust height as needed */}
      <TileLayer attribution={attribution} url={tileUrl} />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
}
