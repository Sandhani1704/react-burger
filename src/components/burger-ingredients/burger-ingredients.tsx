import React, { useEffect, useState, useRef } from "react";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  DISPLAY_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
} from "../../services/actions/ingredient-details";
import { CHANGE_ACTIVE_TAB } from "../../services/actions/burgers-constructor";

import { Loader } from "../ui/loader/loader"; 
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { TIngredient, RootState } from '../../utils/types';

function BurgerIngredients() {
  const [popupOpen, setPopupOpen] = React.useState(false);
  
  const dispatch = useDispatch();
  const { ingredients, itemsRequest, itemsFailed } = useSelector(
    (state: RootState) => state.burgerIngredientsData
  );

  const { currentTab } = useSelector(
    (state: RootState) => state.burgersConstructor
  );

const onIngredientClick = (info: TIngredient) => {
    if (popupOpen) return;
    setPopupOpen(true);
    dispatch({ type: DISPLAY_INGREDIENT_INFO, info });
  };

  const onModalHideClick = () => {
    setPopupOpen(false);
    dispatch({ type: HIDE_INGREDIENT_INFO });
  };
  
  useEffect(() => {
    const ingredientCont: HTMLElement | null = document.getElementById("ingredientCont");
    const listenScrollEvent = () => {
      const tabs: HTMLElement | null = document.getElementById("tabs");
      const buns: HTMLElement | null = document.getElementById("buns");
      const sauces: HTMLElement | null = document.getElementById("sauces");
      const main: HTMLElement | null = document.getElementById("main");

      const isShouldChangeActiveTab = (block: HTMLElement | null) => {
        if (tabs === null || block === null) {
          return;
        }
        return (
          block.getBoundingClientRect().top - 150 <=
          tabs.getBoundingClientRect().bottom
        );
      };

      if (isShouldChangeActiveTab(buns)) {
        const activeTab = "buns"
        dispatch({ type: CHANGE_ACTIVE_TAB, activeTab })
      }
      if (isShouldChangeActiveTab(sauces)) {
        const activeTab = "sauces"
        dispatch({ type: CHANGE_ACTIVE_TAB, activeTab })
      }
      if (isShouldChangeActiveTab(main)) {
        const activeTab = "main"
        dispatch({ type: CHANGE_ACTIVE_TAB, activeTab })
      }
      
    };

    ingredientCont?.addEventListener("scroll", listenScrollEvent);

    return () =>
      ingredientCont?.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={`${styles.types} `}>
      <Tabs />
          
      <div className={styles.container} id="ingredientCont" >
      {itemsRequest ? <Loader /> :
          ( itemsFailed ? <p className="text text_type_main-medium">Произошла ошибка. Перезагрузите браузер.</p> : 
          <>
          <section className={`${styles.content} mb-10`}  id="buns" >
          <h2 className="text text_type_main-medium mb-6"  >Булки</h2>
          <div className={styles.list}>
            {ingredients
              .filter((item: TIngredient) => item.type === "bun")
              .map((item: TIngredient) => (
                <IngredientItem
                  info={item}
                  key={item._id}
                  onIngredientClick={onIngredientClick}
                />
              ))}
          </div>
        </section>
        <section
          className={`${styles.content} mb-10`}
          id="sauces"
        >
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.list}>
            {ingredients
              .filter((item: TIngredient) => item.type === "sauce")
              .map((item: TIngredient) => (
                <IngredientItem
                  info={item}
                  key={item._id}
                  onIngredientClick={onIngredientClick}
                />
              ))}
          </div>
        </section>
        <section className={`${styles.content} mb-10`} id="main">
          <h2 className="text text_type_main-medium mb-6">
            Основные ингредиенты
          </h2>
          <div className={styles.list}>
            {ingredients
              .filter((item: TIngredient) => item.type === "main")
              .map((item: TIngredient) => (
                <IngredientItem
                  info={item}
                  key={item._id}
                  onIngredientClick={onIngredientClick}
                />
              ))}
          </div>
        </section>
        </>)}
      </div>
      {popupOpen && (
        <Modal title="Детали ингредиента" onModalHideClick={onModalHideClick}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerIngredients;
