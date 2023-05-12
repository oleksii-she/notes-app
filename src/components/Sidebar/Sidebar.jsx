import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <section>
        <ul className={styles.sidebar__list}>
          <SidebarItem />
        </ul>
      </section>
    </aside>
  );
};
