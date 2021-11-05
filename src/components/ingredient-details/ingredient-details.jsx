import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
 
const selectedIngredient = useSelector(
state => state.ingredientInfo.selectedIngredient
 );

    return (
        <div className={`mb-15 ${styles.content}`}>
            <div className={`mb-4 ${styles.image_wrapper}`}><img src={selectedIngredient.image_large} alt={selectedIngredient.name}/></div>
            <span className={`mb-8 text text_type_main-medium`}>{selectedIngredient.name}</span>
            <div className={styles.nutrition}>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Калории,ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{selectedIngredient.calories}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{selectedIngredient.proteins}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{selectedIngredient.fat}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{selectedIngredient.carbohydrates}</span>
                </div>
                
            </div>
        </div>
    )
}

export default IngredientDetails
