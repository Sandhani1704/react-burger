import { combineReducers } from 'redux';
import { constructorReducer } from './burgers-constructor';
import { orderReducer} from './order-details';
import { burgerIngredientsDataReducer} from './burger-ingredients-data';
import { ingredientReducer } from './ingredient-details'


export const rootReducer = combineReducers({
    burgersConstructor: constructorReducer,
    order: orderReducer,
    burgerIngredientsData: burgerIngredientsDataReducer,
    ingredientInfo: ingredientReducer
});