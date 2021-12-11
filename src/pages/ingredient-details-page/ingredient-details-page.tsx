import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-details-page.module.css';

const IngredientDetailsPage = () => {

  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mr-10 ml-10`}>
        Детали ингредиента
      </h1>
    <IngredientDetails />
    </>
    
  )
}

export default IngredientDetailsPage;