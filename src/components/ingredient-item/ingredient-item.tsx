import React, { FC, useMemo } from "react";
import styles from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { TIngredient, RootState } from '../../utils/types';

type TIngredientItemProps = {
  info:  TIngredient;
  onIngredientClick: (info: TIngredient) => void;
}


const IngredientItem: FC<TIngredientItemProps> = ({ info, onIngredientClick }) => {
  const addedIngredients = useSelector(
    (state: RootState) => state.burgersConstructor.addedIngredients
  );
  const [, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { info } ,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  }))

  const currentCount = useMemo(() => {
    return addedIngredients.filter(item => item._id === info._id).length
  }, [addedIngredients, info._id])

  const location = useLocation();

  return (
    <Link
      className={styles.content}
      onClick={() => {
        onIngredientClick(info);
      }}
      ref={dragRef}
      to={{
        pathname: `/ingredients/${info._id}`,
        state: {background: location}
      }}
    >
      <img className="mb-1" src={info.image} alt={`ингредиент ${info.name}`} />
      <span className={`text text_type_digits-default mb-1 ${styles.price}`}>
        {info.price} <CurrencyIcon type="primary" />
      </span>
      <span className={`${styles.caption} text text_type_main-default`}>
        {info.name}
      </span>
      {currentCount ? <Counter count={currentCount} size={'default'}/> : null}
    </Link>
  );
};

export default IngredientItem;
