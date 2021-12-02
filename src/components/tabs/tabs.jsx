import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tabs.module.css';
import PropTypes from 'prop-types';

function Tabs({activeTab}) {
  // const tabsRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`${styles.tabs} mt-5 mb-10`} id='tabs' >
      <Tab value='buns' active={activeTab.buns} >
        Булки
      </Tab>
      <Tab value="sauces" active={activeTab.sauces} >
        Соусы
      </Tab>
      <Tab value="main" active={activeTab.main} >
        Начинки
      </Tab>
    </div>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.shape({
    buns: PropTypes.string.isRequired,
    sauces: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
  }),
};

export default Tabs;
