import { getOrder } from '../../utils/api';
import { updateToken } from './user-info';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const HIDE_ORDER_INFO = 'HIDE_ORDER_INFO';

export const getOrderNumber = (ingredients) => (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    getOrder(ingredients)
      .then(res => dispatch({ type: GET_ORDER_SUCCESS, order: res.order }))
      .catch(err => {
      console.log(err)
        if (err.message === "jwt expired") {
          dispatch(updateToken(getOrderNumber, ingredients));
          return;
        }
        dispatch({ type: GET_ORDER_FAILED })
      })
  }
