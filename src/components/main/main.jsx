import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getIngredients } from "../../utils/api";

function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState({});

  const onIngredientClick = (ingredient) => {
    if (popupOpen) return;
    setPopupOpen(true);
    setSelectedIngredient(ingredient)
  };

  const onModalHideClick = () => {
    setPopupOpen(false);
  };

  React.useEffect(() => {
    getIngredients()
      //.then(res => res.json())
      //.then(result => setIngredients(result.data))

      .then((res) => {
        if (res) {
          const initialDatas = Object.values(res.data);
          setIngredients(initialDatas);
        }
      })
      .catch((err) => console.log(`Ошибка сервера: ${err}`));
    console.log(ingredients);
  }, []);

  //   React.useEffect(() => {
  //     const getProductData = async () => {

  //         const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
  //         const data = await res.json();

  //         setIngredients(data);
  //         console.log(data)
  //     }

  //     getProductData();

  // }, [])

  return (
    <main className={` ${styles.main} pt-5`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.content}>
        <BurgerIngredients
          ingredients={ingredients}
          onIngredientClick={onIngredientClick}
        />
        <BurgerConstructor ingredients={ingredients} />
      </div>
      {popupOpen && (
        <Modal title={"Детали ингредиента"} onModalHideClick={onModalHideClick}>
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </main>
  );
}

export default Main;
