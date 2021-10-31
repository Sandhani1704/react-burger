import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tabs.module.css';

function Tabs({activeTab}) {
 // const [current, setCurrent] = React.useState('buns');


   
  return (
    <div className={`${styles.tabs} mt-5 mb-10`} id='tabs'>
      <Tab value='buns' active={activeTab.buns} >
        Булки
      </Tab>
      {/* <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}> */}
      <Tab value="sauces" active={activeTab.sauces} >
        Соусы
      </Tab>
      <Tab value="main" active={activeTab.main} >
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
