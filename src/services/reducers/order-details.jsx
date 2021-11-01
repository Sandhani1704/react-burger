import {
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  HIDE_ORDER_INFO,
} from "../actions/order-details.jsx";

export const initialState = {
    numberOrder: {},
    orderRequest: false,
    orderRequestFaild: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      
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
          numberOrder: {},
        };
      }
      
  
      default: {
        return state;
      }
    }
  };