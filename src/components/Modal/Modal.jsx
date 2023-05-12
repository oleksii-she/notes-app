import { PropTypes } from "prop-types";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
const modalRoot = document.querySelector("#modal-root");
const Modal = ({ children }) => {
  const { modalToggle, setModalToggle } = useContext(Context);

  useEffect(() => {
    window.addEventListener("keydown", handlerKeyDown);
    function handlerKeyDown(e) {
      if (e.code === "Escape") {
        setModalToggle(false);
      }
    }

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  }, [setModalToggle]);

  function onCloseOverlay(e) {
    if (e.target === e.currentTarget) {
      setModalToggle(false);
    }
  }

  return createPortal(
    <div
      className={
        modalToggle
          ? `${styles.overlay} ${styles.show_modal}`
          : `${styles.isHidden}`
      }
      onClick={(e) => onCloseOverlay(e)}
    >
      <div
        className={
          modalToggle ? `${styles.modal} ${styles.show}` : `${styles.hidden}`
        }
      >
        <>{children}</>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
