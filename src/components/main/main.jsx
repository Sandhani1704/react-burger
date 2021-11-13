import React, { useEffect } from "react";
import styles from "./main.module.css";
import { Route } from "react-router-dom";
import LoginPage from "../../pages/login-page/login-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/actions/burger-ingredients-data";
function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <main className={` ${styles.main} pt-10`}>
      <Route exact="true" path="/">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegistrationPage />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>
    </main>
  );
}

export default Main;
