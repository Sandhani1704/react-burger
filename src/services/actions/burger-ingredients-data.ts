import { getIngredients } from '../../utils/api';
import { AppDispatch } from '../../utils/types';
import { TIngredient } from '../../utils/types';
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

type TGetItemsSuccesAction = {
  type: typeof GET_ITEMS_SUCCESS ;
  ingredients: Array<TIngredient>;
}

type TGetItemsRequestAction = {
  type: typeof GET_ITEMS_REQUEST;
}

type TGetItemsFailedAction = {
  type: typeof GET_ITEMS_FAILED;
}

export type TBurgerIngredientsDataActions = 
TGetItemsSuccesAction |
TGetItemsRequestAction |
TGetItemsFailedAction

export const getItems = () => (dispatch: AppDispatch) => {
    dispatch({ type: GET_ITEMS_REQUEST });
    getIngredients()
      .then(res => dispatch({ type: GET_ITEMS_SUCCESS, ingredients: res.data }))
      .catch((err) => dispatch({ type: GET_ITEMS_FAILED }))
  }
  