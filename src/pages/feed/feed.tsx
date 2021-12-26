import styles from "./feed.module.css";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/types";
import { ORDERS_URL } from "../../utils/constants";
import { Loader } from "../../components/ui/loader/loader";
import OrderItemList from "../../components/order-item-list/order-item-list";

function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, wsUrl: ORDERS_URL });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector(
    (store: RootState) => store.ordersInfo
  );

  return (
    <div className={` ${styles.container} pt-10`}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      {orders ? (
        <div className={styles.content}>
          <div className={styles.list}>
            <OrderItemList />
          </div>
          <div className={styles.info}>
            <div className={styles.status}>
              <div className={styles["item"]}>
                <p className="text text_type_main-medium mb-5">Готовы:</p>
                <div className={styles["item-done"]}>
                  {orders?.slice(0, 10).map((order) =>
                    order.status === "done" ? (
                      <p
                        className={`${styles.done} text text_type_digits-default`}
                        key={order._id}
                      >
                        {order.number}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
              <div className={styles.item}>
                <p className="text text_type_main-medium mb-5">В работе:</p>
                {orders?.slice(0, 10).map((order) =>
                  order.status === "pending" || order.status === "created" ? (
                    <p
                      key={order._id}
                      className={`${styles.done} text text_type_digits-default`}
                    >
                      {order.number}
                    </p>
                  ) : null
                )}
              </div>
            </div>
            <div className="mt-15">
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className={`${styles.glow} text text_type_digits-large`}>
                {total}
              </p>
            </div>
            <div className="mt-15">
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className={`${styles.glow} text text_type_digits-large`}>
                {totalToday}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Feed;
