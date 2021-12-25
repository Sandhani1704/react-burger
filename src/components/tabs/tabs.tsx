import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tabs.module.css';
import { useSelector } from "react-redux";
import { RootState } from '../../utils/types';

const Tabs: FC = () => {
  
  const { currentTab } = useSelector(
    (state: RootState) => state.burgersConstructor
  );

  // const handleTab = (value: string, ref: typeof bunRef | typeof sauceRef | typeof mainRef) => () => {
  //   setTab(value);
  //   if (!ref.current) {return null}
  //   if (bunRef.current && sauceRef.current && mainRef.current) {
  //     ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  //   }
  // }

  return (
    <div className={`${styles.tabs} mt-5 mb-10`} id='tabs' >
      <Tab value='buns' active={currentTab === 'buns' } onClick={() => {console.log('функция еще не написана')}} >
        Булки
      </Tab>
      <Tab value="sauces" active={ currentTab === "sauces" } onClick={() => {console.log('функция еще не написана')}} > 
        Соусы
      </Tab>
      <Tab value="main" active={ currentTab === "main"} onClick={() => {console.log('функция еще не написана')}} >
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
