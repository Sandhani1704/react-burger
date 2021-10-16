import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal({ title, onModalHideClick, children }) {

  Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    onModalHideClick: PropTypes.func.isRequired,
  }; 

  return ReactDOM.createPortal(
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
  );
}

export default Modal;
