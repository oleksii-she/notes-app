import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";

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
        // onBlur={() => {
        //   if (addPostToggle || !id) {
        //     return;
        //   }
        //   setUpdateToggle(true);
        // }}
        onBlur={handleBlur}
      />
      <textarea
        className="workspace__text"
        value={text}
        onChange={textareaChange}
        onBlur={handleBlur}
        // onBlur={() => {
        //   if (addPostToggle || !id) {
        //     return;
        //   }
        //   setUpdateToggle(true);
        // }}
      ></textarea>
    </div>
  );
};
