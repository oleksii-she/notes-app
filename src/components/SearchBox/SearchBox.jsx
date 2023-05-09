import PropTypes from "prop-types";
export const SearchBox = ({ children }) => {
  return (
    <header className="search-box">
      {children}
      <input type="text" />
    </header>
  );
};

SearchBox.propTypes = {
  children: PropTypes.node.isRequired,
};
