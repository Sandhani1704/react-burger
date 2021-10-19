import React from "react";
import styles from "./order-details.module.css";
import DoneIcon from "../../images/graphics.png";
import PropTypes from 'prop-types';

function OrderDetails({orderData}) {
  return (
    <div className={`mb-15 ${styles.container}`}>
      <span className="text text_type_digits-large mb-8">{orderData.number}</span>
      <span className="text text_type_main-medium mb-15">
        Идентификатор заказа
      </span>
      <img
        src={DoneIcon}
        className={`mb-15 ${styles.image}`}
        alt="иконка готовности"
      />
      <span className="text text_type_main-default  mb-2">
        {orderData.status}
      </span>
      <span className="text text_type_main-small text_color_inactive mb-30">
        {orderData.wait}
      </span>
    </div>
  );
}
  OrderDetails.propTypes = {
    orderData: PropTypes.shape({
        number: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        wait: PropTypes.string.isRequired,
    }).isRequired,
}

export default OrderDetails;
