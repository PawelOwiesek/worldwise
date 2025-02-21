import { Link } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav>
      <ul className={styles.list}>
        <Link to="/">home</Link>
      </ul>
    </nav>
  );
}

export default AppNav;
