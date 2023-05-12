import instance from "./utils/axios";
const { VITE_API_DOC, VITE_API_KEY } = import.meta.env;

export const getNotes = async () => {
  const result = await instance.get(
    `/dtypes/entity/${VITE_API_DOC}.json?rest_api_key=${VITE_API_KEY}&view=`
  );
  return result;
};

export const getNoteId = async (id) => {
  try {
    const result = await instance.get(
      `/dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const addNewNote = async (newData) => {
  try {
    const result = await instance.post(
      `/dtypes.json?rest_api_key=${VITE_API_KEY}`,
      { ...newData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNote = async (id, data) => {
  try {
    const result = await instance.put(
      `/dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`,
      {
        ...data,
      }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeNoteId = async (id) => {
  try {
    const result = await instance.delete(
      `dtypes/${id}.json?rest_api_key=${VITE_API_KEY}`
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
