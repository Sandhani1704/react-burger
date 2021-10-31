import {
  DISPLAY_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
} from "../actions/burgers-constructor.jsx";

export const initialState = {
  selectedIngredient: {},
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_INGREDIENT_INFO: {
      return { ...state, selectedIngredient: action.info };
    }
    case HIDE_INGREDIENT_INFO: {
      return { ...state, selectedIngredient: {} };
    }
    default: {
      return state;
    }
  }
};
