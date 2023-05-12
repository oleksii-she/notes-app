import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import Modal from "../Modal/Modal";
import styles from "./Workspace.module.scss";
const { VITE_API_ENTIPY } = import.meta.env;
export const Workspace = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [dataTime, setDataTime] = useState("");

  const {
    id,
    setId,
    getNoteId,
    createPostToggle,
    addPostToggle,
    setCreatePostToggle,
    addNewNote,
    setAddPostToggle,
    updateNote,
    setRemovePostToggle,
    setModalToggle,
    modalToggle,
  } = useContext(ApiContext);

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
        console.log(data);
        const result = data.record;
        console.log(result.updated_at, "result.updated_at");
        if (!result) {
          return;
        }

        setDataTime(
          format(new Date(result.updated_at), "MMMM d yyyy, 'at' H:m a")
        );
        setText(result.values.ddRe_cGtrcg4RcNSoTWOay);
        setTitle(result.values.agA0ZdNh5cQ4oHBCojvSoI);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNoteIdsRequest();
  }, [id, getNoteId, addPostToggle]);

  const inputChange = (e) => {
    setTitle(e.target.value);
  };

  const textareaChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const createPost = async () => {
      try {
        if (id) {
          return;
        }

        const dataCreatePost = {
          entity_id: VITE_API_ENTIPY,
          values: {
            ddRe_cGtrcg4RcNSoTWOay: text,
            agA0ZdNh5cQ4oHBCojvSoI: title,
          },
        };

        if (createPostToggle) {
          await addNewNote(dataCreatePost);

          setCreatePostToggle(false);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    createPost();
  }, [
    createPostToggle,
    addNewNote,
    title,
    text,
    setCreatePostToggle,
    addPostToggle,
    setAddPostToggle,
    id,
  ]);

  const handleBlur = async () => {
    if (id) {
      const newData = {
        id,
        entity_id: VITE_API_ENTIPY,
        values: {
          ddRe_cGtrcg4RcNSoTWOay: text,
          agA0ZdNh5cQ4oHBCojvSoI: title,
        },
      };
      await updateNote(newData);
    } else {
      return;
    }
  };
  return (
    <div className={styles.workspace}>
      <p className={styles.workspace__data_text}>{dataTime}</p>
      <input
        type="text"
        value={title}
        className={styles.workspace__input}
        onChange={inputChange}
        onBlur={handleBlur}
        placeholder="Name"
      />
      <textarea
        className={styles.workspace__text}
        value={text}
        onChange={textareaChange}
        onBlur={handleBlur}
        placeholder="Description"
      ></textarea>

      {modalToggle && (
        <Modal>
          <div className={styles.wrapperBtn}>
            <h3 className={styles.title}>Are you sure you want to delete?</h3>
            <div className={styles.wrapper__btnBox}>
              <button
                onClick={() => {
                  setRemovePostToggle(true);
                  setModalToggle(false);
                }}
                className={styles.button}
              >
                Delete
              </button>
              <button
                onClick={() => setModalToggle(false)}
                className={styles.button}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
