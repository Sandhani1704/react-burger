import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function Tabs() {
  const [current, setCurrent] = React.useState('buns');
  // const [currentTab, setCurrentTab] = React.useState('buns');
  const [scrollTarget, setScrollTarget] = React.useState('');
  
  const onClickHandler = (e) => {
    setCurrent(e.target.value)
  }
 
  return (
    <div style={{ display: "flex" }} className="mt-5 mb-10">
      <Tab value='buns' active={current === "buns"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
