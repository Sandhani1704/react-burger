import React, { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Redirect, useLocation } from "react-router-dom";
import styles from "./login-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_REQUEST_ERROR } from "../../services/actions/user-info";
import { loginUser } from "../../services/actions/user-info";
import { RootState } from '../../utils/types';

function LoginPage() {
  const { userUnfo, loginError } = useSelector((store: RootState) => store.userInfo);
  const location = useLocation<{from: string}>();
  const dispatch = useDispatch();
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(emailValue, passwordValue));
  };

  useEffect(() => {
    dispatch({ type: SET_LOGIN_REQUEST_ERROR });
  }, [dispatch]);

  if (userUnfo.email) return <Redirect to={location.state?.from || "/"} />;

  return (
    <form className={styles.content} onSubmit={handleLoginSubmit}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input
        type="email"
        placeholder="E-mail"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={emailValue}
        size={"default"}
      />
      <PasswordInput
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={passwordValue}
      />
      <Button type="primary" size="medium">
        Войти
      </Button>
      {loginError ? (
        <p className={`${styles.error} text text_type_main-default mt-10`}>
          {loginError}
        </p>
      ) : null}
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы новый пользователь?{" "}
        <NavLink className={styles.link} to="/register">
          Зарегистрироваться
        </NavLink>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <NavLink className={styles.link} to="/forgot-password">
          Восстановить пароль
        </NavLink>
      </p>
    </form>
  );
}

export default LoginPage;
