import { TIngredient } from '../../utils/types';
export const DISPLAY_INGREDIENT_INFO = 'DISPLAY_INGREDIENT_INFO';
export const HIDE_INGREDIENT_INFO = 'HIDE_INGREDIENT_INFO';

type TDisplayIngredientInfoAction = {
    type: typeof DISPLAY_INGREDIENT_INFO;
    info: TIngredient;
}

type THideIngredientInfoAction = {
    type: typeof HIDE_INGREDIENT_INFO;
}

export type TIngredientInfoActions = 
TDisplayIngredientInfoAction |
THideIngredientInfoAction
