import React from "react";
import styles from "./order-details.module.css";
import DoneIcon from "../../images/graphics.png";
function OrderDetails() {
  return (
    <div className={`mb-15 ${styles.container}`}>
      <span className="text text_type_digits-large mb-8">034536</span>
      <span className="text text_type_main-medium mb-15">
        Идентификатор заказа
      </span>
      <img
        src={DoneIcon}
        className={`mb-15 ${styles.image}`}
        alt="Иконка Готовности"
      />
      <span className="text text_type_main-default  mb-2">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}

export default OrderDetails;
