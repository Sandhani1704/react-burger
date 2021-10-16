import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onModalHideClick }) {
  
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onModalHideClick}></div>,
    document.body
  );
}

ModalOverlay.propTypes = {
  onModalHideClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
