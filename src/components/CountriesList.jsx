import styles from "./CountriesList.module.css";

import CountryItem from "./CountryItem";
import Spiner from "../components/Spinner";
import Message from "./Message";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spiner />;

  if (!cities.length)
    return (
      <Message message="Add city by clicking on a city on the map to see visited countries" />
    );

  return (
    <ul className={styles.countryList}>
      <CountryItem cities={cities} />
    </ul>
  );
}

export default CountriesList;
