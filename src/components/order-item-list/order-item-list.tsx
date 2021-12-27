import React, { FC } from "react";
import styles from "./order-item-list.module.css";
import { Link, useLocation } from "react-router-dom";
import OrderItem from "../order-item/order-item";
import { Loader } from "../ui/loader/loader";
import { useAppSelector } from "../../utils/hooks";
import { TOrder } from "../../utils/types";

const OrderItemList: FC = () => {
  const location = useLocation();
  const { orders } = useAppSelector((store) => store.ordersInfo);

  return (
    <div className={styles.list}>
      {orders ? (
        orders?.slice(0, 10).map((order: TOrder) =>
          order.ingredients ? (
            <Link
              to={{
                pathname: `/feed/${order._id}`,
                state: { background: location },
              }}
              className={styles.link}
              key={order._id}
            >
              <OrderItem
                order={order}
                key={order._id}
              />
            </Link>
          ) : null
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OrderItemList;
