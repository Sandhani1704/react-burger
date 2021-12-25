import React, { FC, useEffect, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";
import { Location } from "history";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ProfilePage from "../../pages/profile-page/profile-page";
import Feed from "../../pages/feed/feed";
import OrderItemDetailsPage from "../../pages/order-item-details-page/order-item-details-page";
import ResetPassword from "../../pages/reset-password/reset-password";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import { ProtectedRoute } from "../protected-route/protected-route";
import UserOrders from "../../pages/user-orders/user-orders";
import { useDispatch } from "react-redux";
import { getUser, updateToken } from "../../services/actions/user-info";
import { getItems } from "../../services/actions/burger-ingredients-data";
import Modal from "../modal/modal";

type TLocationState = {
  background: Location<unknown>;
};

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getItems());
    // dispatch(updateToken(getUser));
    }, [dispatch]);

  const onModalHideClick = useCallback(() => {
    history.go(-1);
    }, [history]);

  // const background =
  //   history.action === "PUSH" ? location.state?.background : null;

  const ModalSwitch = () => {
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background =
    history.action === "PUSH" && location.state && location.state.background;

    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetailsPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegistrationPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>

          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/feed/:id" exact>
            <OrderItemDetailsPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <UserOrders />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:id" exact>
            <OrderItemDetailsPage />
          </ProtectedRoute>

          <Route>
            <NotFound />
          </Route>
        </Switch>
        {background && (
          <>
            <Route
              path="/feed/:id"
              children={
                <Modal
                  title=""
                  // back={"/feed/"}
                  onModalHideClick={onModalHideClick}
                >
                  <OrderItemDetailsPage />
                </Modal>
              }
            ></Route>
            <Route
              path="/profile/orders/:id"
              children={
                <Modal
                  title=""
                  // back={"/profile/orders"}
                  onModalHideClick={onModalHideClick}
                >
                  <OrderItemDetailsPage />
                </Modal>
              }
            ></Route>
          </>
        )}
      </div>
    );
  };
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};
export default App;
