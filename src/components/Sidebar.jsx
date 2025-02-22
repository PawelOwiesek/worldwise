import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyrigth {new Date().getFullYear()} by Unicornes Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
