import React, {FC} from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
    onModalHideClick: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ({ onModalHideClick }) => {
  
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onModalHideClick}></div>,
    document.body
  );
}

export default ModalOverlay;
