import { PropTypes } from "prop-types";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");
export const Modal = ({ children }) => {
  return createPortal(
    <div>
      <div>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
