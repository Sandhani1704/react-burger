import React, { FC, useMemo } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerConstructorMainElement from "../burger-constructor-main-element/burger-constructor-main-element";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAR_PREV_ORDER,
} from "../../services/actions/burgers-constructor";
import { HIDE_ORDER_INFO } from "../../services/actions/order-details";
import { getOrderNumber } from "../../services/actions/order-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDrop } from "react-dnd";
import { TIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const BurgerConstructor: FC = () => {
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const { addedIngredients } = useAppSelector((state) => state.burgersConstructor);

  const allItemsId = addedIngredients.map((item: TIngredient) => item?._id);

  const orderDetailsModalClick = (allItemsId: string[]) => {
    if (orderDetailsModal) return;
    setOrderDetailsModal(true);
    dispatch(getOrderNumber(allItemsId));
  };

  const onModalHideClick = () => {
    setOrderDetailsModal(false);
    dispatch({ type: HIDE_ORDER_INFO });
    dispatch({ type: CLEAR_PREV_ORDER });
  };

  const deleteIngredient = (index: number) => {
    dispatch({ type: DELETE_INGREDIENT, index });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: { info: TIngredient }) {
      dispatch({ type: ADD_INGREDIENT, ingredient: item.info });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalSum = useMemo(() => {
    return addedIngredients.reduce((prev: any, item: { price: number; }) => {
      return prev + item.price;
    }, 0);
  }, [addedIngredients]);

  const bun = React.useMemo(() => {
    return addedIngredients.find((item: { type: string; }) => item.type === "bun");
  }, [addedIngredients]);

  return (
    <div
      ref={dropTarget}
      className={`${styles.constructor} pt-13 pl-10 
    ${isHover && styles.onHover}`}
    >
      {addedIngredients.length ? (
        <div className={styles.container}>
          <div className={`${styles["top-container"]}`}>
            {bun && (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "flex-end",
                }}
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
          <div className={styles["scroll-container"]}>
            {addedIngredients.map((item: TIngredient, index: number) => {
              if (item.type !== "bun") {
                return (
                  <BurgerConstructorMainElement
                    key={index}
                    index={index}
                    item={item}
                    deleteIngredient={deleteIngredient}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className={styles["bottom-container"]}>
            {bun && (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "flex-end",
                }}
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
      ) : (
        <div className={styles.info}>
          <p
            className={`${styles.text} text text_type_main-default text_color_inactive`}
          >
            Переместите сюда ингредиенты для бургера
          </p>
          <p
            className={`${styles.text} text text_type_main-default text_color_inactive`}
          >
            Для оформления заказа нужно обязательно выбрать тип булки.
          </p>
        </div>
      )}

      <div className={`${styles.order} mr-4 mt-10`}>
        <div className={`text mr-10 ${styles.total}`}>
          <p className="text text_type_digits-medium">{totalSum}</p>

          <CurrencyIcon type={"primary"} />
        </div>

        {bun && (
          <Button
            type="primary"
            size="medium"
            onClick={() => orderDetailsModalClick(allItemsId)}
          >
            Оформить заказ
          </Button>
        )}
      </div>
      {orderDetailsModal && (
        <Modal title="" onModalHideClick={onModalHideClick}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
