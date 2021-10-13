import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

function ModalOverlay({onModalHideClick}) {
  

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay} onClick={onModalHideClick}>
                
            </div>
        ),
        document.body
    )
}

export default ModalOverlay