const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUrlPosition from "../useUrlPosition";
import useCities from "../useCities";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import FetchEmoji from "./FetchEmoji";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState([]);
  const [emojiCode, setEmojiCode] = useState("");
  const { addCity, isLoading } = useCities();
  const [startDate, setStartDate] = useState(new Date());

  async function handleAddCity(e) {
    e.preventDefault();
    if (!cityName || !lat || !lng) return;

    const newCity = {
      cityName,
      country,
      date: startDate.toISOString(),
      emoji: emojiCode,
      notes,
      position: { lat, lng },
    };
    await addCity(newCity);
    navigate(-1);
  }

  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return;
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji({
          country: data.countryName,
          emoji: convertToEmoji(data.countryCode),
        });
        setEmojiCode(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleAddCity}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <FetchEmoji city={emoji} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
