import styles from "./user-orders.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { getCookie } from "../../utils/cookies";
import { USER_ORDERS_URL } from "../../utils/constants";
import {
  WS_PRIVATE_CONNECTION_START,
  WS_PRIVATE_CONNECTION_CLOSED,
} from "../../services/actions/ws-private-actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../utils/types";
import OrderItem from "../../components/order-item/order-item";
import { Loader } from "../../components/ui/loader/loader";

function UserOrders() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state: RootState) => state.burgerIngredientsData);
  
  useEffect(() => {
    dispatch({ type: WS_PRIVATE_CONNECTION_START, wsUrl: USER_ORDERS_URL,
      token: getCookie("accessToken") });
    return () => {
      dispatch({ type: WS_PRIVATE_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  const { orders } = useSelector((store: RootState) => store.wsPrivateReducer);

  return (
    <div className={styles.orders}>
      <div className={styles.container}>
        <ProfileNavigation text="В этом разделе вы можете просмотреть свою историю заказов" />
        
        <div className={styles.list}>
        { orders.length && ingredients.length ? (
          orders.map((order) =>
            // order.ingredients ? (
              <Link
              key={order._id}
              to={{
                pathname: `/profile/orders/${order._id}`,
                state: { background: location },
              }}
              className={styles.link}
            >
              <OrderItem
                order={order}
                key={order._id}
            />
              </Link>
            // ) : null
          )
        ) : (
          <Loader />
        )}
      </div>
      </div>
    </div>
  );
}

export default UserOrders;
