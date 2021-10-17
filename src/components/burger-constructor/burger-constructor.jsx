import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { burgerPropTypes } from '../../utils/types';

function BurgerConstructor({ ingredients, orderDetailsModalClick }) {

  const bun = React.useMemo(() => {
    return ingredients.find((item) => item.type === "bun");
  }, [ingredients]);

  const notBuns = ingredients.filter((item) => item.type !== "bun");

  return (
    <div className={`${styles.constructor} pt-13 pl-10`}>
      <div className={styles.container}>
      <div className={styles['top-container']}>
        {bun && (
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        </div>
        <div className={styles['scroll-container']}>
        {notBuns.slice(0, 7).map((item) => (
          
          <div key={item._id} className={styles['main-element']}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
          
        ))}
        </div>
        <div className={styles['bottom-container']}>
        {bun && (
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}
          >
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        </div>
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(burgerPropTypes).isRequired, 
  orderDetailsModalClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
