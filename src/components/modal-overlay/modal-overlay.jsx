import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

function ModalOverlay(onClickHandler) {
  

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay} onClick={onClickHandler}>
                
            </div>
        ),
        document.body
    )
}

export default ModalOverlay