import {
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    TBurgerIngredientsDataActions
  } from "../actions/burger-ingredients-data";
  import { TIngredient } from '../../utils/types';

type TIngredientsState = {
    ingredients: Array<TIngredient>;
    itemsRequest: boolean;
    itemsFailed: boolean;
}
  
  export const initialState: TIngredientsState = {
    ingredients: [],
    itemsRequest: false,
    itemsFailed: false,
  };
  
  export const burgerIngredientsDataReducer = (state = initialState, action: TBurgerIngredientsDataActions): TIngredientsState => {
    switch (action.type) {
      case GET_ITEMS_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
        };
      }
      case GET_ITEMS_SUCCESS: {
        return {
          ...state,
          itemsFailed: false,
          ingredients: action.ingredients,
          itemsRequest: false,
        };
      }
      case GET_ITEMS_FAILED: {
        return { ...state, itemsFailed: true, itemsRequest: false };
      }
        
      default: {
        return state;
      }
    }
  };