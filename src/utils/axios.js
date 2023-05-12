import axios from "axios";
const { VITE_API_CATALOG } = import.meta.env;

const instance = axios.create({
  baseURL: `https://quintadb.com.ua/apps/${VITE_API_CATALOG}`,
});

export default instance;
