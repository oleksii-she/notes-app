import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import Modal from "../Modal/Modal";
import styles from "./Workspace.module.scss";
export const Workspace = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [dataTime, setDataTime] = useState("");
  // const [newTitle, setNewTitle] = useState("");
  // const [newText, setNewText] = useState("");
  const {
    id,
    getNoteId,
    createPostToggle,
    addPostToggle,
    setCreatePostToggle,
    addNewNote,
    setAddPostToggle,
    updateNote,
    setRemovePostToggle,
    setModalToggle,
  } = useContext(ApiContext);

  useEffect(() => {
    const getNoteIdsRequest = async () => {
      try {
        if (addPostToggle) {
          setTitle("");
          setText("");
          setDataTime("");
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

        setDataTime(result.created_at);
        setText(result.values.ddPKaAW6DdKiddLrVcKYO_);
        setTitle(result.values.ahj8kabsvcIPhcGxeWWQXB);
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
          entity_id: "c6WPVcMsvcOOobw0ZcH8kY",
          values: {
            ddPKaAW6DdKiddLrVcKYO_: text,
            ahj8kabsvcIPhcGxeWWQXB: title,
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
        entity_id: "c6WPVcMsvcOOobw0ZcH8kY",
        values: {
          ddPKaAW6DdKiddLrVcKYO_: text,
          ahj8kabsvcIPhcGxeWWQXB: title,
        },
      };
      await updateNote(newData);
    } else {
      return;
    }
  };
  return (
    <div className="workspace content">
      <p>{dataTime}</p>
      <input
        type="text"
        value={title}
        className="workspace__input"
        onChange={inputChange}
        onBlur={handleBlur}
      />
      <textarea
        className="workspace__text"
        value={text}
        onChange={textareaChange}
        onBlur={handleBlur}
      ></textarea>

      {id && (
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
