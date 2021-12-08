import {
  DISPLAY_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
  TIngredientInfoActions
} from "../actions/ingredient-details";
import { TIngredient } from '../../utils/types';

export type TIngredientState = {
  selectedIngredient: TIngredient | null;
}

export const initialState: TIngredientState = {
  selectedIngredient: null,
};

export const ingredientReducer = (state = initialState, action: TIngredientInfoActions): TIngredientState => {
  switch (action.type) {
    case DISPLAY_INGREDIENT_INFO: {
      return { ...state, selectedIngredient: action.info };
    }
    case HIDE_INGREDIENT_INFO: {
      return { ...state, selectedIngredient: null };
    }
    default: {
      return state;
    }
  }
};
