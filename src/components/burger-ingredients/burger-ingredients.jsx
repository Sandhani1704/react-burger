import React, { useState, useEffect, useRef } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';

function BurgerIngredients({ ingredients, onIngredientClick }) {
  
  const listsRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

    
  return (
    <div className={`${styles.types} `} >
        <Tabs />
        <div ref={listsRef} className={styles.container}>
      <section className={`${styles.content} mb-10`}>
        <h2 ref={bunsRef} className='text text_type_main-medium mb-6'>Булки</h2>
        <div className={styles.list}>
       { ingredients.filter(item => item.type === 'bun').map(item => (
            <IngredientItem info={item} key={item._id} onIngredientClick={onIngredientClick} 
             />
          ))
        }
        </div>
      </section>
      <section className={`${styles.content} mb-10`}>
        <h2 ref={saucesRef} className='text text_type_main-medium mb-6'>Соусы</h2>
        <div className={styles.list}>
          {ingredients.filter(item => item.type === 'sauce').map(item => (
            <IngredientItem info={item} key={item._id} onIngredientClick={onIngredientClick}/>
          ))}
        </div>
      </section>
      <section className={`${styles.content} mb-10`}>
        <h2 ref={mainRef} className='text text_type_main-medium mb-6'>Основные ингредиенты</h2>
        <div className={styles.list}>
        {ingredients.filter(item => item.type === 'main').map(item => (
            <IngredientItem info={item} key={item._id} onIngredientClick={onIngredientClick} />
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}

export default BurgerIngredients;