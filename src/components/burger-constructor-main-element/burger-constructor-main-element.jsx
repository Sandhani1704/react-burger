import React, { useRef } from "react";
import styles from "./burger-constructor-main-element.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { SORT_INGREDIENTS } from '../../services/actions/burgers-constructor';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/types';

function BurgerConstructorMainElement({ item, index, deleteIngredient }) {
const dispatch = useDispatch();
const ref = useRef(null);

const [ { isDragging }, drag] = useDrag({
    type: 'main',
    item: () => {
      return { index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [, drop] = useDrop({
    accept: 'main',
    collect: monitor => ({
      isHovered: monitor.isOver()
    }),
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!ref.current)
        return;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex)
        return;

      dispatch({ type: SORT_INGREDIENTS, dragIndex, hoverIndex})
      
      item.index = hoverIndex;
    }
  })

  drag(drop(ref))

  return (
    <div ref={ref} key={index} className={styles["main-element"]}  >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(index)}
      />
    </div>
  );
}

BurgerConstructorMainElement.propTypes = {
  item: ingredientPropTypes.isRequired, 
  deleteIngredient: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorMainElement;
