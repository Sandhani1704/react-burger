import { combineReducers } from 'redux';
import { constructorReducer } from './burgers-constructor';
import { orderReducer} from './order-details';
import { burgerIngredientsDataReducer} from './burger-ingredients-data';
import { ingredientReducer } from './ingredient-details';
import { userReducer } from './user-info';
import { wsReducer } from './ws-reducer';
import { wsPrivateReducer } from './ws-private-reducer';


export const rootReducer = combineReducers({
    burgersConstructor: constructorReducer,
    order: orderReducer,
    burgerIngredientsData: burgerIngredientsDataReducer,
    ingredientInfo: ingredientReducer,
    userInfo: userReducer,
    ordersInfo: wsReducer,
    wsPrivateReducer: wsPrivateReducer,
    
});