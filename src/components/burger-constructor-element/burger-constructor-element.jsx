import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructorElement({ info, buns, notBuns }) {
  
  return (
    <>
   <ConstructorElement
      type='top'
      isLocked={true}
      text={info.name}
      price={info.price}
      thumbnail={info.image}
    />
  
    </>
  );
}

export default BurgerConstructorElement;
