import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.scss";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatcMedia";
export const Sidebar = () => {
  const { sidebarToggle, setSidebarToggle } = useContext(Context);
  const { isMobile } = useMatchMedia();

  return (
    <aside
      className={
        isMobile && sidebarToggle
          ? `${styles.sidebar} ${styles.sidebar__show_hidden}`
          : `${styles.sidebar} `
      }
    >
      <section>
        <ul
          className={`${styles.sidebar__list} ${styles.sidebar__list_mobile}`}
        >
          <SidebarItem />
        </ul>
      </section>
    </aside>
  );
};
