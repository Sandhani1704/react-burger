import { getOrder } from '../../utils/api';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const HIDE_ORDER_INFO = 'HIDE_ORDER_INFO';

export function getOrderNumber(ingredients) {
    return function(dispatch) {
      dispatch({
        type: GET_ORDER_REQUEST
      });
      getOrder(ingredients).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      });
    };
  }
