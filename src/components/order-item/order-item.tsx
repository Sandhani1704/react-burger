import React, { FC, useMemo } from "react";
import styles from "./order-item.module.css";
import { TOrder } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { transformDate } from "../../utils/formating";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/types";

type TOrderProps = {
  order: TOrder;
  // onModalClick: () => void;
};

const OrderItem: FC<TOrderProps> = ({ order }) => {

  const { ingredients } = useSelector(
    (state: RootState) => state.burgerIngredientsData
  );

  const ordersImages = useMemo(() => {
    return order.ingredients.map((orderId: string) => {
      return ingredients?.find((ingredient) => {
        return ingredient._id === orderId;
      });
    });
  }, [order.ingredients, ingredients]);

  const visibleOrdersImages = useMemo(() => {
    return ordersImages.slice(0, 6);
  }, [ordersImages]);

  const countHiddenOrdersImages = useMemo(() => {
    return order.ingredients.length - visibleOrdersImages.length;
  }, [order.ingredients, visibleOrdersImages]);

  const bunsCount = useMemo(() => {
    return ordersImages.filter((item) => item?.type === "bun").length;
  }, [ordersImages]);

  const orderPrice = useMemo(() => {
    return ordersImages.reduce((acc, item) => {
      if (item?.type !== "bun") return (acc += item?.price || 0);

      return (acc += bunsCount === 1 ? item?.price * 2 : item?.price);
    }, 0);
  }, [ordersImages, bunsCount]);

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

  return (
    <div className={styles.link}>
      <div className={styles.top}>
        <span className="text text_type_digits-default"># {order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {transformDate(order.updatedAt)}
        </span>
      </div>
      <span className={`${styles.name} text text_type_main-medium mt-6`}>
        {order.name}
      </span>
      <span className="text text_type_main-default mt-2 mb-6">
        {showStatus(order.status)}
      </span>
      <div className={styles.bottom}>
        <div className={styles["image-boxes"]}>
          {visibleOrdersImages.map(
            (item, index: React.Key | null | undefined) => (
              <div
                key={index}
                className={styles["image-box"]}
                style={{
                  backgroundImage: `url("${item?.image_mobile}")`,
                }}
              >
                {index === visibleOrdersImages.length - 1 &&
                countHiddenOrdersImages ? (
                  <p
                    className={`${styles["hidden-count"]} text text_type_main-default`}
                  >
                    +{countHiddenOrdersImages}
                  </p>
                ) : null}
              </div>
            )
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
