import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tabs.module.css';
// import PropTypes from 'prop-types';
import { TTabNames } from '../../utils/types';
import { useSelector } from "react-redux";
import { RootState } from '../../utils/types';
// type TTabsProps = {
//   currentTab: TTabNames;
// }

const Tabs: FC = () => {
  // const tabsRef = useRef<HTMLDivElement>(null);
  const { currentTab } = useSelector(
    (state: RootState) => state.burgersConstructor
  );

  return (
    <div className={`${styles.tabs} mt-5 mb-10`} id='tabs' >
      <Tab value='buns' active={currentTab === 'buns' } onClick={() => {console.log(123)}} >
        Булки
      </Tab>
      <Tab value="sauces" active={ currentTab === "sauces" } onClick={() => {console.log(123)}} > 
        Соусы
      </Tab>
      <Tab value="main" active={ currentTab === "main"} onClick={() => {console.log(123)}} >
        Начинки
      </Tab>
    </div>
  );
}

// active={activeTab.sauces}

// Tabs.propTypes = {
//   activeTab: PropTypes.shape({
//     buns: PropTypes.string.isRequired,
//     sauces: PropTypes.string.isRequired,
//     main: PropTypes.string.isRequired,
//   }),
// };

export default Tabs;
