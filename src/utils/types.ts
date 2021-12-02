import PropTypes from 'prop-types';
import { store } from '../index'

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

  export type TTabNames = {
    currentTab: 'buns' | 'sauces' | 'main' | '';
  }

  export type RootState = ReturnType<typeof store.getState>;
  