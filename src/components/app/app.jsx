import React from 'react';
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import styles from './app.module.css'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;