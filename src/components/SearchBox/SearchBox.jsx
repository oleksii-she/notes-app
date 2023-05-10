import { ApiContext } from "../../context/ApiContext";
import { useContext } from "react";

export const SearchBox = () => {
  const {
    createPostToggle,
    setCreatePostToggle,
    setAddPostToggle,
    addPostToggle,
    setModalToggle,
    id,
  } = useContext(ApiContext);
  return (
    <header className="search-box">
      <div>
        <button
          onClick={() => {
            if (addPostToggle) {
              return;
            }
            setAddPostToggle(true);
            setCreatePostToggle(false);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            if (createPostToggle) {
              return console.log("Oops");
            }
            setCreatePostToggle(true);
          }}
        >
          create post
        </button>

        <button
          onClick={() => setModalToggle(true)}
          disabled={id ? false : true}
        >
          remove post
        </button>
      </div>
      <input type="text" />
    </header>
  );
};
