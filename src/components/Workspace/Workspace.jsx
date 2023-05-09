import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
export const Workspace = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { id, getNotesId } = useContext(ApiContext);

  useEffect(() => {
    const getNoteIdsRequest = async () => {
      try {
        const { data } = await getNotesId(id);

        const result = data.record;
        if (!result) {
          return;
        }

        setText(result.values.cLebz1dNfma4kwF2iHssuh);
        setTitle(result.values.aTqmobWOPdS6FdPSk0sxXO);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNoteIdsRequest();
  }, [id, getNotesId]);

  const inputChange = (e) => {
    setTitle(e.target.value);
  };

  const textareaChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="workspace content">
      <input
        type="text"
        value={title}
        className="workspace__input"
        onChange={inputChange}
      />
      <textarea
        className="workspace__text"
        value={text}
        onChange={textareaChange}
      ></textarea>
    </div>
  );
};
