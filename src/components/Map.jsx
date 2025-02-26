import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParam] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>
        Postion:{lat},{lng}
      </p>
      <button
        onClick={() => {
          setSearchParam({ lat: 47, lng: -6876 });
        }}
      >
        Change positon
      </button>
    </div>
  );
}

export default Map;
