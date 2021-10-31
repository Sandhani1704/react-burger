import React, { useRef } from "react";
import styles from "./burger-constructor-main-element.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { SORT_INGREDIENTS } from '../../services/actions/burgers-constructor';

function BurgerConstructorMainElement({ item, index, deleteIngredient }) {
const dispatch = useDispatch();
const ref = useRef(null);
//   const [, drag] = useDrag(() => ({
//     type: "burgerIngredient",
//     item: { item },
//     collect: (monitor) => ({
//       isDrag: monitor.isDragging(),
//     }),
//   }));

const [ { isDrag }, drag] = useDrag({
    type: 'main',
    item: () => {
      return { index };
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
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

      if (dragIndex === hoverIndex)
        return;

      dispatch({ type: SORT_INGREDIENTS, dragIndex, hoverIndex})
      item.index = index;
    }
  })

  drag(drop(ref))

  return (
    !isDrag &&
    <div ref={ref} key={index} className={styles["main-element"]}>
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

export default BurgerConstructorMainElement;
