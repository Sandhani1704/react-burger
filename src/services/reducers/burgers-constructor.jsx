import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../actions/burgers-constructor.jsx";

export const initialState = {
  addedIngredients: [],
  currentTab: "buns",
  scrollTarget: "",
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        addedIngredients:
          action.ingredient.type === "bun"
            ? [
                ...state.addedIngredients.filter((item) => item.type !== "bun"),
                action.ingredient,
                action.ingredient,
              ]
            : [...state.addedIngredients, action.ingredient],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        addedIngredients: state.addedIngredients.filter(
          (item, index) => index !== action.index
        ),
      };
    }
    case SORT_INGREDIENTS: {
      const newArr = [...state.addedIngredients];
      
      let draggedItem = newArr[action.dragIndex];
      let targetItem = newArr[action.hoverIndex];
      newArr.splice(action.dragIndex, 1, targetItem);
      newArr.splice(action.hoverIndex, 1, draggedItem);
      
      return {
        ...state,
        addedIngredients: newArr
      }
    }

    default: {
      return state;
    }
  }
};
