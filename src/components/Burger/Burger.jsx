import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import styles from "./Burger.module.scss";

export const Burger = () => {
  const { sidebarToggle, mobToggleSidebar } = useContext(ApiContext);

  return (
    <div
      className={`${styles.burger} ${!sidebarToggle ? styles.open : ""}`}
      onClick={() => mobToggleSidebar()}
    >
      <span className={styles.burger__span}></span>
      <span className={styles.burger__span}></span>
      <span className={styles.burger__span}></span>
    </div>
  );
};
