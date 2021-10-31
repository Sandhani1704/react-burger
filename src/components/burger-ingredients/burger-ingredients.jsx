import React, { useEffect, useMemo, useRef, useState } from "react";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./burger-ingredients.module.css";
import Tabs from "../tabs/tabs";
// import PropTypes from "prop-types";
// import { burgerPropTypes } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  DISPLAY_INGREDIENT_INFO,
  HIDE_INGREDIENT_INFO,
} from "../../services/actions/burgers-constructor";
import { Loader } from "../ui/loader/loader";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function BurgerIngredients() {
  const [popupOpen, setPopupOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { ingredients, itemsRequest } = useSelector(
    (state) => state.burgerIngredientsData
  );

  const sauceRef = useRef();
  const bunRef = useRef();
  const mainRef = useRef();
  //console.log(bunRef)

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const loader = useMemo(() => {
    return itemsRequest && <Loader size="large" />;
  }, [itemsRequest]);

  const onIngredientClick = (info) => {
    if (popupOpen) return;
    setPopupOpen(true);
    dispatch({ type: DISPLAY_INGREDIENT_INFO, info });
  };

  const onModalHideClick = () => {
    setPopupOpen(false);
    dispatch({ type: HIDE_INGREDIENT_INFO });
  };

  const [activeTab, setActiveTab] = useState({
    sauces: "",
    buns: "buns",
    main: "",
  });

  useEffect(() => {
    const ingredientCont = document.getElementById("ingredientCont");
    const listenScrollEvent = () => {
      const tabs = document.getElementById("tabs");
      const buns = document.getElementById("buns");
      const sauces = document.getElementById("sauces");
      const main = document.getElementById("main");

      const isShouldChangeActiveTab = (block) => {
        return (
          block.getBoundingClientRect().top - 100 <=
          tabs.getBoundingClientRect().bottom
        );
      };

      if (isShouldChangeActiveTab(buns)) {
        setActiveTab({
          sauce: "",
          buns: "buns",
          main: "",
        });
      }
      if (isShouldChangeActiveTab(sauces)) {
        setActiveTab({
          sauces: "sauces",
          buns: "",
          main: "",
        });
      }
      if (isShouldChangeActiveTab(main)) {
        setActiveTab({
          sauces: "",
          buns: "",
          main: "main",
        });
      }
      
    };

    ingredientCont.addEventListener("scroll", listenScrollEvent);

    return () =>
      ingredientCont.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={`${styles.types} `}>
      <Tabs activeTab={activeTab} />
      <div className={styles.container} id="ingredientCont">
        {loader}
        <section className={`${styles.content} mb-10`} ref={bunRef} id="buns">
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <div className={styles.list}>
            {ingredients
              .filter((item) => item.type === "bun")
              .map((item) => (
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
          ref={sauceRef}
          id="sauces"
        >
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <div className={styles.list}>
            {ingredients
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <IngredientItem
                  info={item}
                  key={item._id}
                  onIngredientClick={onIngredientClick}
                />
              ))}
          </div>
        </section>
        <section className={`${styles.content} mb-10`} ref={mainRef} id="main">
          <h2 className="text text_type_main-medium mb-6">
            Основные ингредиенты
          </h2>
          <div className={styles.list}>
            {ingredients
              .filter((item) => item.type === "main")
              .map((item) => (
                <IngredientItem
                  info={item}
                  key={item._id}
                  onIngredientClick={onIngredientClick}
                />
              ))}
          </div>
        </section>
      </div>
      {popupOpen && (
        <Modal title="Детали ингредиента" onModalHideClick={onModalHideClick}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(burgerPropTypes).isRequired,
//   onIngredientClick: PropTypes.func.isRequired,
// };

export default BurgerIngredients;
