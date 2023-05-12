import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import styles from "./Workspace.module.scss";
import { getNoteId, addNewNote, updateNote } from "../../api";
import { Burger } from "../Burger/Burger";
import { useMatchMedia } from "../../hooks/useMatcMedia";
import { WarningDelete } from "../warningDelete/warningDelete";

const { VITE_API_ENTITY } = import.meta.env;
export const Workspace = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [dataTime, setDataTime] = useState("");
  const { isMobile } = useMatchMedia();

  const {
    id,
    setId,
    createPostToggle,
    addPostToggle,
    setCreatePostToggle,
    setAddPostToggle,
    modalToggle,
    setNotes,
    filterNotice,
    setSidebarToggle,
  } = useContext(Context);

  useEffect(() => {
    const getNoteIdsRequest = async () => {
      try {
        if (addPostToggle) {
          setTitle("");
          setText("");
          setDataTime("");
          setId(null);
          return;
        }
        if (!id) {
          return;
        }

        const { data } = await getNoteId(id);
        const result = data.record;

        if (!result) {
          return;
        }

        setDataTime(
          format(new Date(result.updated_at), "MMMM d yyyy, 'at' H:m a")
        );
        setTitle(result.values.cYgX_dVCnhBioHc8o2W4rH);
        setText(result.values.cdW5pdGq1oW43dOSoLW6iy);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNoteIdsRequest();
  }, [id, addPostToggle, setId]);

  const textareaChange = (e) => {
    const name = e.currentTarget.name;
    if (name === "title") {
      setTitle(e.target.value);
    } else {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    const createPost = async () => {
      try {
        if (id) {
          return;
        }

        const dataCreatePost = {
          entity_id: VITE_API_ENTITY,
          values: {
            cYgX_dVCnhBioHc8o2W4rH: title,
            cdW5pdGq1oW43dOSoLW6iy: text,
          },
        };

        if (createPostToggle) {
          const result = await addNewNote(dataCreatePost);
          console.log(result.data.record);
          setId(result.data.record.id);
          setAddPostToggle(false);
          setCreatePostToggle(false);
          setNotes((prevState) => [result.data.record, ...prevState]);

          return;
        }
      } catch (error) {
        console.log(error.message);
        setCreatePostToggle(false);
      }
    };

    createPost();
  }, [
    createPostToggle,
    title,
    text,
    setCreatePostToggle,
    addPostToggle,
    setAddPostToggle,
    id,
    setId,
    setNotes,
  ]);

  const handleBlur = async () => {
    if (id) {
      const newData = {
        id,
        entity_id: VITE_API_ENTITY,
        values: {
          cYgX_dVCnhBioHc8o2W4rH: title,
          cdW5pdGq1oW43dOSoLW6iy: text,
        },
      };
      const result = await updateNote(id, newData);

      const update = filterNotice.map((el) => {
        if (el.id === result.data.record.id) {
          return { ...el, ...result.data.record };
        }
        return el;
      });

      setNotes(update);
    } else {
      return;
    }
  };

  const handleClick = () => {
    setSidebarToggle(true);
  };

  return (
    <div className={styles.workspace}>
      {isMobile && <Burger />}
      <p className={styles.workspace__data_text}>{dataTime}</p>

      <textarea
        placeholder="Name"
        name="title"
        className={styles.workspace__title}
        onChange={textareaChange}
        onBlur={() => handleBlur()}
        value={title}
        maxLength={100}
        onClick={handleClick}
      ></textarea>

      {title.length === 100 && (
        <p style={{ color: "red" }}>Maximum characters limit reached!</p>
      )}
      <textarea
        className={styles.workspace__text}
        value={text}
        onChange={textareaChange}
        onBlur={() => handleBlur()}
        placeholder="Description"
        onClick={handleClick}
      ></textarea>

      {modalToggle && <WarningDelete />}
    </div>
  );
};
