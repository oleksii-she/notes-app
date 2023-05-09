import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
export const SaidbarItem = () => {
  const [notes, setNotes] = useState([]);
  // const [id, setId] = useState(null);

  const { getNotes, getNotesId, setId } = useContext(ApiContext);
  useEffect(() => {
    const getNotesRequest = async () => {
      try {
        const { data } = await getNotes();
        if (data.records.length <= 0) {
          return console.log("Oops");
        } else {
          setNotes(data.records);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getNotesRequest();
  }, [getNotes, getNotesId]);

  return (
    <>
      {notes.map(({ id, created_at, values }) => {
        return (
          <li key={id} className="sidebar__section-item">
            <div onClick={() => setId(id)}>
              <div>
                <p>{created_at}</p>
              </div>
              <div>
                <p>{values.cLebz1dNfma4kwF2iHssuh}</p>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};
