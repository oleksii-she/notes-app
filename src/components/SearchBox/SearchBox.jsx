import { ApiContext } from "../../context/ApiContext";
import { useContext } from "react";
import styles from "./SearchBox.module.scss";
import { useState } from "react";
import {
  SearchIcon,
  RemoveIcon,
  CreateNoteIcon,
  AddNoteIcon,
} from "../../assets/svg";
export const SearchBox = () => {
  const [focus, setFocus] = useState(false);
  const {
    createPostToggle,
    setCreatePostToggle,
    setAddPostToggle,
    addPostToggle,
    setModalToggle,
    id,
    setFilter,
  } = useContext(ApiContext);
  return (
    <header className={styles.header}>
      <div className={styles.button_box}>
        <button
          onClick={() => {
            if (addPostToggle) {
              return;
            }
            setAddPostToggle(true);
            setCreatePostToggle(false);
          }}
          className={styles.button}
        >
          <AddNoteIcon className={styles.button__Icon} />
        </button>
        <button
          onClick={() => setModalToggle(true)}
          disabled={id ? false : true}
          className={styles.button}
        >
          <RemoveIcon className={styles.button__Icon} />
        </button>
        <button
          onClick={() => {
            if (createPostToggle) {
              return console.log("Oops");
            }
            setCreatePostToggle(true);
          }}
          className={styles.button}
        >
          <CreateNoteIcon className={styles.button__Icon} />
        </button>
      </div>
      <div className={styles.search_box}>
        <input
          type="text"
          className={styles.input_search}
          placeholder="Search"
          onChange={(e) => {
            setFilter(e.target.value);
            if (e.target.value.length > 0) {
              setFocus(true);
            } else {
              setFocus(false);
            }
          }}
        />
        {!focus && <SearchIcon className={styles.search_box__icon} />}
      </div>
    </header>
  );
};
