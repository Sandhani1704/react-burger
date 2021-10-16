import React from "react";
import styles from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../types";

const IngredientItem = ({ info, onIngredientClick }) => {
  return (
    <div
      className={styles.content}
      onClick={() => {
        onIngredientClick(info);
      }}
    >
      <img className="mb-1" src={info.image} alt={`ингредиент ${info.name}`} />
      <span className={`text text_type_digits-default mb-1 ${styles.price}`}>
        {info.price} <CurrencyIcon type="primary" />
      </span>
      <span className={`${styles.caption} text text_type_main-default`}>
        {info.name}
      </span>
      <Counter size={"default"} />
    </div>
  );
};

IngredientItem.propTypes = {
  info: ingredientPropTypes,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientItem;
