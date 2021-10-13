import React from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import { mockBurgerData } from '../../mocks/burger-mock-data';
import Tabs from '../tabs/tabs';

function BurgerIngredients({ ingredients, onIngredientClick }) {
  console.log(ingredients)
  
  return (
    <div className={`${styles.types} `} >
        <Tabs />
        <div className={styles.container}>
      <section className='mb-10'>
        <h2 className='text text_type_main-medium mb-6'>Булки</h2>
        <div className={styles.list}>
       { ingredients.filter(item => item.type === 'bun').map(item => (
            <IngredientItem info={item} key={item._id} onIngredientClick={onIngredientClick} 
             />
          ))
        }
        </div>
      </section>
      <section className="mb-10">
        <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
        <div className={styles.list}>
          {ingredients.filter(item => item.type === 'sauce').map(item => (
            <IngredientItem info={item} key={item._id} onIngredientClick={onIngredientClick}/>
          ))}
        </div>
      </section>
      <section>
        <h2 className='text text_type_main-medium mb-6'>Основные ингредиенты</h2>
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