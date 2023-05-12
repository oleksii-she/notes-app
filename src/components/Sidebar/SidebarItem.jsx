import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import styles from "./Sidebar.module.scss";

export const SidebarItem = () => {
  const [notes, setNotes] = useState([]);
  const {
    setId,
    setAddPostToggle,
    getNotes,
    filter,
    id: activeId,
  } = useContext(ApiContext);

  useEffect(() => {
    const getNotesRequest = async () => {
      try {
        const { data } = await getNotes();
        if (data.records.length <= 0) {
          return;
        } else {
          setNotes(data.records);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getNotesRequest();
  }, [getNotes]);

  const FindContact = () => {
    const normalizedfilter = filter.toLowerCase();

    return notes.filter((contact) =>
      contact.values.agA0ZdNh5cQ4oHBCojvSoI
        .toLowerCase()
        .includes(normalizedfilter)
    );
  };
  const filterNotice = FindContact();

  return (
    <>
      <li className={styles.sidebar__item}>
        <div className={`${styles.sidebar__link} `}>
          <div>
            <h3 className={`${styles.sidebar__item_title}`}>asdasda</h3>
          </div>
          <div>
            <p className={styles.sidebar__item_text}>
              asdasdas
              <span className={styles.sidebar__item_text_span}>asdasdas</span>
            </p>
          </div>
        </div>
      </li>
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
                  {values.agA0ZdNh5cQ4oHBCojvSoI}
                </h3>
              </div>
              <div>
                <p className={styles.sidebar__item_text}>
                  {format(new Date(updated_at), "H:m a")}
                  <span className={styles.sidebar__item_text_span}>
                    {values.ddRe_cGtrcg4RcNSoTWOay}
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
