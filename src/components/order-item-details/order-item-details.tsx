import React, { FC } from "react";
import styles from "./order-item-details.module.css";
import { useParams, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/types";
import { Loader } from "../ui/loader/loader";
import { transformDate } from "../../utils/formating";

const OrderItemDetails: FC = () => {
  const isProfile = !!useRouteMatch('/profile');
  
  const { ingredients } = useSelector(
    (state: RootState) => state.burgerIngredientsData
  );
  const { orders } = useSelector(
    (store: RootState) => isProfile ? store.ordersInfo : store.wsPrivateReducer
  );

  const { id } = useParams<{ id: string }>();

  const selectedOrder = orders && orders.find((item: { _id: string; }) => item._id === id);
  const listId = orders && selectedOrder?.ingredients;

  const orderIngredients =
    orders &&
    listId?.map((id: string) => {
      return ingredients?.find((item) => item._id === id);
    });

  console.log(orderIngredients);

  const price =
    orders &&
    orderIngredients?.reduce((sum, item) => {
      return sum + (item?.price || 0);
    }, 0);

  const showStatus = (status: string | null) => {
    if (status === "done") {
      return "Выполнен";
    }
    if (status === "pending") {
      return "Готовится";
    }
    if (status === "pending") {
      return "Создан";
    } else {
      return null;
    }
  };

  const status = selectedOrder && showStatus(selectedOrder.status);

  if (!orders.length) return null;

  return selectedOrder ? (
    <div className={styles.order}>
      <span className={`text text_type_digits-default mb-10 ${styles.number}`}>
        #{selectedOrder?.number}
      </span>
      <h1
        className={`text text_type_main-medium mb-3 ${styles["left-align"]} ${styles["order-name"]} `}
      >
        {selectedOrder?.name}
      </h1>
      <span
        className={`text text_type_main-default mb-15 ${
          styles["left-align"]
        } ${`${selectedOrder?.status === "done"} && ${
          styles["status-done"]
        }`}   `}
      >
        {status}
      </span>
      <span
        className={`text text_type_main-medium mb-6 ${styles["left-align"]}`}
      >
        Состав:
      </span>
      <ul className={styles.ingredients}>
        {orderIngredients?.map((item, index) => (
          <li key={index} className={styles.ingredient}>
            <div className={styles["ingredient-preview"]}>
              <div
                className={styles["image-box"]}
                style={{
                  backgroundImage: `url("${item?.image_mobile}")`,
                }}
              />
              <span className="text text_type_main-default mr-4 ml-4">
                {item?.name}
              </span>
            </div>
            <div>
              <span className={`text text_type_digits-default ${styles.price}`}>
                {/* {`${item?.count} x ${item?.price}`} <CurrencyIcon type='primary'/> */}
                {item?.price} <CurrencyIcon type="primary" />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles["bottom-content"]}`}>
        <span className="text text_type_main-default text_color_inactive">
          {transformDate(selectedOrder.updatedAt)}
        </span>
        <div className={styles["order-price"]}>
          <span className="text text_type_digits-default">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default OrderItemDetails;
