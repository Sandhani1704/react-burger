import React from "react";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { mockBurgerData } from "../../mocks/burger-mock-data";

function BurgerConstructor({ingredients}) {
  return (
    <div className={`${styles.constructor} pt-13 pl-20`}>
      {ingredients.slice(0, 5).map((item) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <BurgerConstructorElement info={item} key={item._id} />
        </div>
      ))}

      <div className={`${styles.order} mr-4`}>
        <div className="mr-10">
          <div className={`text ${styles.main}`}>
            
            <p className="text text_type_digits-medium">500</p>
            <div className={styles.currencyIcon}>
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
