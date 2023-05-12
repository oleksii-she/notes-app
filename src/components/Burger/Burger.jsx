import { useContext } from "react";
import { Context } from "../../context/Context";
import styles from "./Burger.module.scss";

export const Burger = () => {
  const { sidebarToggle, mobToggleSidebar } = useContext(Context);

  return (
    <button
      className={`${styles.burger} ${!sidebarToggle ? styles.open : ""}`}
      onClick={() => {
        mobToggleSidebar();
      }}
    >
      <span className={styles.burger__span}></span>
      <span className={styles.burger__span}></span>
      <span className={styles.burger__span}></span>
    </button>
  );
};
