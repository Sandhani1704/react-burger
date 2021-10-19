import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { getIngredients } from "../../utils/api";
import { orderData } from '../../utils/order-data';

function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState({});

  const onIngredientClick = (ingredient) => {
    if (popupOpen) return;
    setPopupOpen(true);
    setSelectedIngredient(ingredient);
  };

  const orderDetailsModalClick = () => {
    if (orderDetailsModal) return;
    setOrderDetailsModal(true);
  };

  const onModalHideClick = () => {
    setPopupOpen(false);
    setOrderDetailsModal(false);
  };

  React.useEffect(() => {
    getIngredients()
      .then((res) => {
        if (res) {
          const initialDatas = Object.values(res.data);
          setIngredients(initialDatas);
        }
      })
      .catch((err) => console.log(`Ошибка сервера: ${err}`));
  }, []);

  return (
    <main className={` ${styles.main} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.content}>
        <BurgerIngredients
          ingredients={ingredients}
          onIngredientClick={onIngredientClick}
        />
        <BurgerConstructor
          ingredients={ingredients}
          orderDetailsModalClick={orderDetailsModalClick}
        />
      </div>
      {popupOpen && (
        <Modal title="Детали ингредиента" onModalHideClick={onModalHideClick}>
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
      {orderDetailsModal && (
        <Modal title='' onModalHideClick={onModalHideClick}>
          <OrderDetails orderData={orderData} />
        </Modal>
      )}
    </main>
  );
}

export default Main;
