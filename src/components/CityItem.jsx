import { useEffect, useState } from "react";
import styles from "./CityItem.module.css";
import emojiToCountryCode from "../../data/emojiToCountryCode";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, country, emoji, date } = city;
  const [flagSVG, setFlagSVG] = useState(null);

  useEffect(() => {
    if (emoji) {
      const countryCode = emojiToCountryCode[emoji];
      if (countryCode) {
        fetch(
          `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${countryCode}.svg`
        )
          .then((response) => response.text())
          .then((svg) => {
            setFlagSVG(svg);
          })
          .catch((error) => {
            console.error("Error fetching SVG:", error);
          });
      }
    }
  }, [emoji]);
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>
        {flagSVG ? (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(flagSVG)}`}
            alt={`Flag of ${country}`}
            width="28"
          />
        ) : (
          emoji
        )}
      </span>
      <h3 className={styles.name}> {cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
