import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Sidebar({ isSidebarOpen }) {
  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
