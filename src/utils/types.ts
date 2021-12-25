import PropTypes from 'prop-types';
import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TConstructorActions } from '../services/actions/burgers-constructor';
import { TOrderActions } from '../services/actions/order-details';
import { TUserInfoAction } from '../services/actions/user-info';
import { TBurgerIngredientsDataActions } from '../services/actions/burger-ingredients-data';
import { TIngredientInfoActions } from '../services/actions/ingredient-details';

export const burgerPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  });

export type TIngredient = {
    name: string;
    price: number;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: string;
    _id: string;
  };

export type TOrder = {
  _id: string;
  number: string;
  name: string;
  date: string;
  price: number;
  status: string;
  ingredients: Array<string>;
  updatedAt: string;
  image_mobile: string;
}

  export type TUserInfoResponse = {
    success: boolean;
    user: { email: string; name: string };
    accessToken: string
    refreshToken: string;
  }
  
  export type TError = {
    success?: string,
    message?: string;
    type?: string;
    code?: number;
 }

 export type TTabNames = 'buns' | 'sauces' | 'main' | '';
  
 export  type TApplicationActions = TUserInfoAction | TConstructorActions | TOrderActions | TBurgerIngredientsDataActions | TIngredientInfoActions
  export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  