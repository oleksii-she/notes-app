import instance from "../utils/axios";
import { createContext, useState } from "react";

import PropTypes from "prop-types";

const { VITE_API_DOC, VITE_API_KEY } = import.meta.env;

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [createPostToggle, setCreatePostToggle] = useState(false);
  const [addPostToggle, setAddPostToggle] = useState(false);
  const [removePostToggle, setRemovePostToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [filter, setFilter] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const mobToggleSidebar = () => setSidebarToggle(!sidebarToggle);
  const getNotes = async () => {
    const result = await instance.get(
      `/dtypes/entity/${VITE_API_DOC}.json?rest_api_key=${VITE_API_KEY}&view=`
    );
    return result;
  };

  const getNoteId = async (id) => {
    const result = await instance.get(
      `/dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`
    );
    return result;
  };

  const addNewNote = async (newData) => {
    try {
      if (!createPostToggle) {
        return;
      }
      const result = await instance.post(
        `/dtypes.json?rest_api_key=${VITE_API_KEY}`,
        { ...newData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setId(result.data.record.id);
      setAddPostToggle(false);
      setCreatePostToggle(false);
    } catch (error) {
      setCreatePostToggle(false);
      console.log(error.message);
    }
  };

  const updateNote = async (data) => {
    try {
      await instance.put(`/dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`, {
        ...data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeNoteId = async (id) => {
    try {
      if (!removePostToggle) {
        return;
      }
      await instance.delete(`dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`);

      setRemovePostToggle(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  removeNoteId(id);
  return (
    <ApiContext.Provider
      value={{
        getNotes,
        getNoteId,
        setId,
        id,
        createPostToggle,
        setCreatePostToggle,
        setAddPostToggle,
        addPostToggle,
        addNewNote,
        setRemovePostToggle,
        updateNote,
        modalToggle,
        setModalToggle,
        setFilter,
        filter,
        mobToggleSidebar,
        sidebarToggle,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
