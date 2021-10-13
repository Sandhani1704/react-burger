import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-element.module.css";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructorElement({info}) {
  return (
    // <div style={{maxHeight: '80px', width: '536px'}}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={info.name}
        price={info.price}
        thumbnail={info.image}
        
      />
      // </div>
    
  );
}

export default BurgerConstructorElement;
