import { useEffect, useState } from "react";
import styles from "./fetchEmoji.module.css";

import emojiToCountryCode from "../../data/emojiToCountryCode";

function FetchEmoji({ city }) {
  const [flagSVG, setFlagSVG] = useState(null);
  const { emoji, country } = city;

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
  );
}

export default FetchEmoji;
