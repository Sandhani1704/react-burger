import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../types';

function IngredientDetails({selectedIngredient}) {
        
    const {image_large, calories, proteins, carbohydrates, fat, name} = selectedIngredient;
    return (
        <div className={`mb-15 ${styles.content}`}>
            <div className={`mb-4 ${styles.image_wrapper}`}><img src={image_large} alt={name}/></div>
            <span className={`mb-8 text text_type_main-medium`}>{name}</span>
            <div className={styles.nutrition}>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Калории,ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{calories}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{proteins}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{fat}</span>
                </div>
                <div className={styles.item}>
                    <span className={`text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{carbohydrates}</span>
                </div>
                
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    selectedIngredient: ingredientPropTypes.isRequired,
};

export default IngredientDetails