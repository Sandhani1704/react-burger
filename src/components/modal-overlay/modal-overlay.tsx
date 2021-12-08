import React, {FC} from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
// import PropTypes from "prop-types";
type TModalOverlayProps = {
    onModalHideClick: () => void;
}


const ModalOverlay: FC<TModalOverlayProps> = ({ onModalHideClick }) => {
  
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onModalHideClick}></div>,
    document.body
  );
}

// ModalOverlay.propTypes = {
//   onModalHideClick: PropTypes.func.isRequired,
// };

export default ModalOverlay;
