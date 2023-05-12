import { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";

export const Context = createContext();
import { getNotes } from "../api";
export const ContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [createPostToggle, setCreatePostToggle] = useState(false);
  const [addPostToggle, setAddPostToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [filter, setFilter] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [notes, setNotes] = useState([]);
  const mobToggleSidebar = () => setSidebarToggle(!sidebarToggle);

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
  }, []);

  const FindContact = () => {
    const normalizedfilter = filter.toLowerCase();

    if (notes.length > 0) {
      return notes.filter((contact) =>
        contact.values.bDW4ftExncWQZcTmkqW7f1
          .toLowerCase()
          .includes(normalizedfilter)
      );
    }

    return [];
  };
  const filterNotice = FindContact();

  return (
    <Context.Provider
      value={{
        setId,
        id,
        createPostToggle,
        setCreatePostToggle,
        setAddPostToggle,
        addPostToggle,
        modalToggle,
        setModalToggle,
        setFilter,
        filter,
        mobToggleSidebar,
        sidebarToggle,
        setNotes,
        FindContact,
        filterNotice,
        setSidebarToggle,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
