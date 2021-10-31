import { getIngredients } from '../../utils/api';
import { getOrder } from '../../utils/api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const DISPLAY_INGREDIENT_INFO = 'DISPLAY_INGREDIENT_INFO';
export const HIDE_INGREDIENT_INFO = 'HIDE_INGREDIENT_INFO';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; 
export const DELETE_INGREDIENT = 'DELETE_ITEM';
// export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const HIDE_ORDER_INFO = 'HIDE_ORDER_INFO';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export function getItems() {
    return function(dispatch) {
      dispatch({
        type: GET_ITEMS_REQUEST
      });
      getIngredients().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      });
    };
  }

  export function getOrderNumber(ingredients) {
    return function(dispatch) {
      getOrder(ingredients).then(res => {
        if (res && res.success) {
          console.log(res)
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
  // export const getOrderNumber = (ingredients) => (dispatch) => {
  //   getOrder(ingredients)
  //     .then(result => dispatch({ type: GET_ORDER_SUCCESS, order: result.order }))
  //     .catch(err => dispatch({ type: GET_ORDER_FAILED }))
  // }
  