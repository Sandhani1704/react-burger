import { TIngredient, TTabNames } from '../../utils/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT'; 
export const DELETE_INGREDIENT = 'DELETE_ITEM';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_PREV_ORDER = 'CLEAR_PREV_ORDER';
export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

type TChangeActiveTab = {
  type: typeof CHANGE_ACTIVE_TAB;
  activeTab: TTabNames;
}

  type TClearPrevOrder = {
    type: typeof CLEAR_PREV_ORDER;
  }
    
  type TAddIngredientInOrderAction = {
    type: typeof ADD_INGREDIENT;
    ingredient: TIngredient;
  }
  
  type TRemoveIgredientAction = {
    type: typeof DELETE_INGREDIENT;
    index: number;
  }
  
  type TSortIngredientsAction = {
    type: typeof SORT_INGREDIENTS;
    dragIndex: number;
    hoverIndex: number;
  }
  
  export type TConstructorActions = 
    TClearPrevOrder |
    TAddIngredientInOrderAction |
    TRemoveIgredientAction |
    TSortIngredientsAction | 
    TChangeActiveTab