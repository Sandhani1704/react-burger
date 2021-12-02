import {
  DISPLAY_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
} from "../actions/ingredient-details.jsx";

export const initialState = {
  selectedIngredient: null,
};

export const ingredientReducer = (state = initialState, action) => {
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
