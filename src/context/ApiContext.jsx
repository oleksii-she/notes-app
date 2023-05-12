import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_API_KEY;
const { VITE_API_CATALOG, VITE_API_DOC } = import.meta.env;

const instance = axios.create({
  baseURL: `https://quintadb.com.ua/apps/${VITE_API_CATALOG}`,
});

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [createPostToggle, setCreatePostToggle] = useState(false);
  const [addPostToggle, setAddPostToggle] = useState(false);
  const [removePostToggle, setRemovePostToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [filter, setFilter] = useState("");
  console.log(createPostToggle, "createPostToggle");
  console.log(addPostToggle, "addPostToggle");
  console.log(updateToggle, "updateToggle");
  console.log("filter", filter);
  const getNotes = async () => {
    const result = await instance.get(
      `/dtypes/entity/${VITE_API_DOC}.json?rest_api_key=${apiKey}&view=`
    );
    return result;
  };

  const getNoteId = async (id) => {
    const result = await instance.get(
      `/dtypes/${id}.json?rest_api_key=${apiKey}`
    );
    return result;
  };

  const addNewNote = async (newData) => {
    try {
      if (!createPostToggle) {
        console.log("Oops createPostToggle");
        return;
      }
      console.log(newData, "newData");
      const result = await instance.post(
        `/dtypes.json?rest_api_key=${apiKey}`,
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
      await instance.put(`/dtypes/${id}.json?rest_api_key=${apiKey}`, {
        ...data,
      });
      setUpdateToggle(false);
    } catch (error) {
      setUpdateToggle(false);
      console.log(error.message);
    }
  };

  const removeNoteId = async (id) => {
    try {
      if (!removePostToggle) {
        return;
      }
      await instance.delete(`dtypes/${id}.json?rest_api_key=${apiKey}`);

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
        setUpdateToggle,
        modalToggle,
        setModalToggle,
        setFilter,
        filter,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
