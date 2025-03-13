import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCities from "../useCities";
import { useGeolocation } from "../useGeoLocation";
import { useUrlPosition } from "../useUrlPosition";
import FetchEmoji from "./FetchEmoji";
import styles from "./Map.module.css";
import Button from "./Button";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

function Map({ setIsSidebarOpen, isSidebarOpen }) {
  const [mapPositon, setMapPositon] = useState([40, 0]);
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPositon([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPositon([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPositon}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <FetchEmoji city={city} />
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPositon} />
        <OnMapClick
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function OnMapClick({ setIsSidebarOpen, isSidebarOpen }) {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setIsSidebarOpen(!isSidebarOpen);
    },
  });
}

export default Map;
