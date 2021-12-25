import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styles from "./order-item-details-page.module.css";
import OrderItemDetails from "../../components/order-item-details/order-item-details";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/ws-actions";
import {
  WS_PRIVATE_CONNECTION_START,
  WS_PRIVATE_CONNECTION_CLOSED,
} from "../../services/actions/ws-private-actions";
import { useDispatch } from "react-redux";
import { ORDERS_URL, USER_ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookies";

const OrderItemDetailsPage = () => {
  const isProfile = !!useRouteMatch("/profile");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      isProfile
        ? {
            type: WS_PRIVATE_CONNECTION_START,
            wsUrl: USER_ORDERS_URL,
            token: getCookie("accessToken"),
          }
        : { type: WS_CONNECTION_START, wsUrl: ORDERS_URL }
    );
    return () => {
      dispatch(
        isProfile
          ? { type: WS_PRIVATE_CONNECTION_CLOSED }
          : { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch, isProfile]);

  return (
    <div className={styles.block}>
      <OrderItemDetails />
    </div>
  );
};

export default OrderItemDetailsPage;
