import styles from "./CountryItem.module.css";
import FetchEmoji from "./FetchEmoji";

function CountryItem({ cities }) {
  const countries = cities.reduce((array, city) => {
    if (!array.map((el) => el.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }];
    else return array;
  }, []);

  return (
    <>
      {countries.map((country) => {
        return (
          <li key={country.emoji} className={styles.countryItem}>
            <FetchEmoji city={country} />
            <span>{country.country}</span>
          </li>
        );
      })}
    </>
  );
}

export default CountryItem;
