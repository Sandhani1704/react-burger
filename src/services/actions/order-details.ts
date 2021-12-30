import { getOrder } from '../../utils/api';
import { updateToken } from './user-info';
import { AppDispatch, TOrder, AppThunk } from '../../utils/types';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const HIDE_ORDER_INFO = 'HIDE_ORDER_INFO';

type TGetOrderSuccess = {
  type: typeof GET_ORDER_SUCCESS;
  order: TOrder;
}

type TGetOrderRequest = {
  type: typeof GET_ORDER_REQUEST;
}

type TGetOrderFailed = {
  type: typeof GET_ORDER_FAILED;
}

type THideOrderInfo = {
  type: typeof HIDE_ORDER_INFO;
}

export type TOrderActions =
  TGetOrderSuccess |
  TGetOrderRequest | TGetOrderFailed | THideOrderInfo

export const getOrderNumber: AppThunk = (ingredients: string[]) => (dispatch: AppDispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  getOrder(ingredients)
    .then(res => dispatch({ type: GET_ORDER_SUCCESS, order: res.order }))
    .catch(err => {
      if (err.message === "jwt expired") {
        dispatch(updateToken() as any);
        return;
      }
      dispatch({ type: GET_ORDER_FAILED })
    })
}
