import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import FetchEmoji from "./FetchEmoji";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, date, id } = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        <FetchEmoji city={city} />
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
