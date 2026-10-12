import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix the default Leaflet marker icons in Vite.
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

function MapUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], map.getZoom());
  }, [latitude, longitude, map]);

  return null;
}

export default function BusMap({ bus }) {
  const latitude = Number(bus?.latitude);
  const longitude = Number(bus?.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return <p>Waiting for valid bus location...</p>;
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          latitude={latitude}
          longitude={longitude}
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>Bus: {bus.busNumber}</strong>
            <br />
            Route: {bus.route}
            <br />
            Status: {bus.status}
            <br />
            Latitude: {latitude}
            <br />
            Longitude: {longitude}
            <br />
            Last update: {bus.updatedAt}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
