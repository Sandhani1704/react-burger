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
import { updateToken, getUser } from "../../services/actions/user-info";
import { getItems } from "../../services/actions/burger-ingredients-data";
import Modal from "../modal/modal";
import { CLOSE_POPUP_ORDER_INFO } from "../../services/actions/ws-actions";
import { HIDE_ORDER_INFO } from "../../services/actions/order-details";

type TLocationState = {
  background: Location<unknown>;
};

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getItems());
    dispatch(updateToken());
  }, [dispatch]);

  const ModalSwitch = () => {
    const location = useLocation<TLocationState>();
    const history = useHistory();

    const isShowModal = history.action === "PUSH";

    const onModalHideClick = () => {
      dispatch({
        type: CLOSE_POPUP_ORDER_INFO,
      });
      history.go(-1);
    };

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
            {isShowModal ? (
              <Route
                path="/feed/:id"
                children={
                  <Modal title="" onModalHideClick={onModalHideClick}>
                    <OrderItemDetailsPage />
                  </Modal>
                }
              ></Route>
            ) : (
              <Route path="/feed/:id" exact>
                <OrderItemDetailsPage />
              </Route>
            )}

            <Route
              path="/profile/orders/:id"
              children={
                <Modal title="" onModalHideClick={onModalHideClick}>
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
