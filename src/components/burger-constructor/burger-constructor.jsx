import React from "react";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ ingredients, orderDetailsModalClick }) {
  const bun = React.useMemo(() => {
    return ingredients.find((item) => item.type === "bun");
  }, [ingredients]);

  // const buns = ingredients.filter((item) => item.type === "bun");

  const notBuns = ingredients.filter((item) => item.type !== "bun");

  return (
    <div className={`${styles.constructor} pt-13 pl-20`}>
      <div className={styles.container}>
      {bun && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) }
        {notBuns.slice(0, 5).map((item) => (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
          <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
        {bun && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) }
      </div>
      <div className={`${styles.order} mr-4 mt-10`}>
        <div className={`text mr-10 ${styles.total}`}>
          <p className="text text_type_digits-medium">500</p>

          <CurrencyIcon type={"primary"} />
        </div>

        <Button type="primary" size="normal" onClick={orderDetailsModalClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
