import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";

export const SaidbarItem = () => {
  const [notes, setNotes] = useState([]);
  const { setId, setAddPostToggle, getNotes, setUpdateToggle } =
    useContext(ApiContext);

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
  console.log(notes);
  return (
    <>
      {notes.map(({ id, created_at, values }) => {
        return (
          <li key={id} className="sidebar__section-item">
            <div
              onClick={() => {
                setId(id), setAddPostToggle(false);
                setUpdateToggle(true);
              }}
            >
              <div>
                <p>{created_at}</p>
              </div>
              <div>
                <p>{values.ahj8kabsvcIPhcGxeWWQXB}</p>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};
