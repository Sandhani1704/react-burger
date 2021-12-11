import { TOrder } from '../../utils/types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  HIDE_ORDER_INFO,
  TOrderActions
} from "../actions/order-details";

export type TOrderState = {
  numberOrder: TOrder | null;
  orderRequest: boolean;
  orderRequestFaild: boolean;
}


export const initialState: TOrderState = {
    numberOrder: null,
    orderRequest: false,
    orderRequestFaild: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
      case GET_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
        };
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          numberOrder: action.order,
        };
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          orderRequestFaild: true,
        };
      }
      case HIDE_ORDER_INFO: {
        return {
          ...state,
          orderRequestFaild: false,
          numberOrder: null,
        };
      }
    default: {
        return state;
      }
    }
  };