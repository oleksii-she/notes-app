import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: `https://quintadb.com.ua/apps/${apiKey}/dtypes`,
});

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [id, setId] = useState(null);

  const getNotes = async () => {
    const result = await instance.get(
      "entity/dcVmoYFSjay6FcHNhcN8k9.json?rest_api_key=bOqw5GqHPdPOobWOXhnSkY&"
    );
    return result;
  };

  const getNotesId = async (id) => {
    const result = await instance.get(
      `${id}.json?rest_api_key=bOqw5GqHPdPOobWOXhnSkY`
    );
    return result;
  };

  return (
    <ApiContext.Provider value={{ getNotes, getNotesId, setId, id }}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
