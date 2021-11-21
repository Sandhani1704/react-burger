import React from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

function IngredientDetails() {
  const { selectedIngredient } = useSelector((state) => state.ingredientInfo);

  const { ingredients } = useSelector((state) => state.burgerIngredientsData);
  
  const { id } = useParams();
  const info = selectedIngredient
    ? selectedIngredient
    : ingredients.find((item) => item._id === id);

  if (!ingredients.length) return null;

  if (!info) {
    return <Redirect to="/notfound" />;
  }

  return (
    <div className={`mb-15 ${styles.content}`}>
      <div className={`mb-4 ${styles.image_wrapper}`}>
        <img src={info.image_large} alt={info.name} />
      </div>
      <span className={`mb-8 text text_type_main-medium`}>{info.name}</span>
      <div className={styles.nutrition}>
        <div className={styles.item}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Калории,ккал
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {info.calories}
          </span>
        </div>
        <div className={styles.item}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Белки, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {info.proteins}
          </span>
        </div>
        <div className={styles.item}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Жиры, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {info.fat}
          </span>
        </div>
        <div className={styles.item}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {info.carbohydrates}
          </span>
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default IngredientDetails;
