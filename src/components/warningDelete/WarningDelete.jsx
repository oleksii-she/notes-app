import Modal from "../Modal/Modal";
import styles from "./WarningDelete.module.scss";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { removeNoteId } from "../../api";
export const WarningDelete = () => {
  const { setModalToggle, id, setNotes } = useContext(Context);

  return (
    <Modal>
      <div className={styles.wrapperBtn}>
        <h3 className={styles.title}>Are you sure you want to delete?</h3>
        <div className={styles.wrapper__btnBox}>
          <button
            onClick={async () => {
              try {
                const result = await removeNoteId(id);

                if (result) {
                  setNotes((prevState) =>
                    prevState.filter((el) => el.id !== id)
                  );
                }
                setModalToggle(false);
              } catch (error) {
                console.log(error.message);
                setModalToggle(false);
              }
            }}
            className={styles.button}
          >
            Delete
          </button>
          <button
            onClick={() => setModalToggle(false)}
            className={styles.button}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
