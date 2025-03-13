import { useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.app}>
      <button className={styles.menuButton} onClick={showSideBar}>
        ☰ Menu
      </button>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Map setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default AppLayout;
