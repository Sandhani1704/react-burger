import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
  
  return (
    <main className={` ${styles.main} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      
      
    </main>
  );
}

export default Main;
