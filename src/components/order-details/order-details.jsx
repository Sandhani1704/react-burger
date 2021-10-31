import React from "react";
import styles from "./order-details.module.css";
import DoneIcon from "../../images/graphics.png";
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrderNumber } from '../../services/actions/burgers-constructor';
// import { getOrder } from '../../utils/api';

function OrderDetails() {
  // const dispatch = useDispatch();
  // const { addedIngredients } = useSelector(
  //   (state) => state.burgersConstructor
  // );
  const numberOrder = useSelector((state) => state.order.numberOrder)

  

  //const allItemsId = addedIngredients.map(item => item._id)
  //console.log(allItemsId)

  // useEffect(() => {
  //   dispatch(getOrderNumber(allItemsId))
  // }, [addedIngredients])

  // useEffect(() => {
  //   dispatch(getOrderNumber(addedIngredients.map(item => item._id)))
    
  // }, [])

  return (
    <div className={`mb-15 ${styles.container}`}>
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
    </div>
  );
}
//   OrderDetails.propTypes = {
//     orderData: PropTypes.shape({
//         number: PropTypes.string.isRequired,
//         status: PropTypes.string.isRequired,
//         wait: PropTypes.string.isRequired,
//     }).isRequired,
// }

export default OrderDetails;
