import React from "react";
import styles from "./order-details.module.css";
import DoneIcon from "../../images/graphics.png";
import { useSelector } from 'react-redux';
import { Loader } from "../ui/loader/loader";
import { Redirect } from 'react-router-dom'; 
function OrderDetails() {
  
const { numberOrder, orderRequest, orderRequestFaild } = useSelector((state) => state.order)
const { userUnfo } = useSelector((store) => store.userInfo);
if (!userUnfo.email)
    return <Redirect to='/login'/>

  return (
    <div className={`mb-15 ${styles.container}`}>
      { orderRequest ? <Loader size="large" /> :

      ( orderRequestFaild ? (
          <p className="text text_type_main-medium">Произошла ошибка. Попробуйте ещё раз.</p>
        ) : (<>
      <span className="text text_type_digits-large mb-8">{numberOrder.number}</span> 
    
      <span className="text text_type_main-medium mb-15">
        Идентификатор заказа
      </span>
      <img
        src={DoneIcon}
        className={`mb-15 ${styles.image}`}
        alt="иконка готовности"
      />
      <span className="text text_type_main-default  mb-2">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </span>
      </>) )
      }
    </div>
  );
}

export default OrderDetails;
