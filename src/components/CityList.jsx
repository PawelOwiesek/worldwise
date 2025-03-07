import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spiner from "../components/Spinner";
import Message from "./Message";
import useCities from "../useCities";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spiner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
