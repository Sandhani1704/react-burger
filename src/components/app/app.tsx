import React, { FC, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { Location } from 'history';
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import RegistrationPage from "../../pages/registration-page/registration-page";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ProfilePage from "../../pages/profile-page/profile-page";
import ResetPassword from "../../pages/reset-password/reset-password";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import { ProtectedRoute } from "../protected-route/protected-route";
import UserOrders from "../../pages/user-orders/user-orders";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/actions/user-info";
import { getItems } from "../../services/actions/burger-ingredients-data";

type TLocationState = {
  background: Location<unknown>;
};

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getItems());
  }, [dispatch]);

  const location = useLocation<TLocationState>();
  const history = useHistory();

  const background =
    history.action === "PUSH" ? location.state?.background : null;

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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <UserOrders />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
