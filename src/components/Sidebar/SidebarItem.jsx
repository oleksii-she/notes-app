import { format } from "date-fns";
import { useContext } from "react";
import { Context } from "../../context/Context";
import styles from "./Sidebar.module.scss";

export const SidebarItem = () => {
  const {
    setId,
    setAddPostToggle,
    id: activeId,
    filterNotice,
  } = useContext(Context);

  return (
    <>
      {filterNotice.map(({ id, updated_at, values }) => {
        const isActive = activeId === id;

        return (
          <li key={id} className={styles.sidebar__item}>
            <div
              onClick={() => {
                setId(id), setAddPostToggle(false);
              }}
              className={
                isActive
                  ? `${styles.sidebar__link} ${styles.active}`
                  : `${styles.sidebar__link}`
              }
            >
              <div>
                <h3 className={`${styles.sidebar__item_title}`}>
                  {values.bDW4ftExncWQZcTmkqW7f1}
                </h3>
              </div>
              <div>
                <p className={styles.sidebar__item_text}>
                  {format(new Date(updated_at), "H:m a")}
                  <span className={styles.sidebar__item_text_span}>
                    {values.b2WQzCarrifiklW68sDCkD}
                  </span>
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};
