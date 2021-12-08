import React, { FC } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

type TModalProps = {
  title:  string;
  onModalHideClick: () => void;
}

const Modal: FC<TModalProps> = ({ title, onModalHideClick, children }) => {
  
  React.useEffect(() => {
    function handleEscClose(evt: globalThis.KeyboardEvent) {
      if (evt.key === "Escape") {
        onModalHideClick();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return modalRoot ? ReactDOM.createPortal(
    <div>
      <ModalOverlay onModalHideClick={onModalHideClick} />
      <div className={styles.popup}>
        <div>
          <div className={`ml-10 mr-10 ${styles.container}`}>
            <div className={`text text_type_main-large ${styles.title}`}>
              {title}
            </div>
            <button
              type="button"
              className={styles["close-icon"]}
              onClick={onModalHideClick}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  ) : null;
}

// Modal.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.element.isRequired,
//   onModalHideClick: PropTypes.func.isRequired,
// };

export default Modal;
