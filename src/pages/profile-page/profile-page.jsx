import React, { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import { Route, NavLink } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';

function ProfilePage() {
  const { userUnfo } = useSelector((store) => store.userInfo);
  const [emailValue, setEmail] = useState("mail@stellar.burgers");
  const [nameValue, setName] = useState("Марк");
  const [passwordValue, setPassword] = useState("123");

  return (
      <>
    <div className={styles.profile}>
      <nav className={styles.nav}>
      <NavLink exact to='/profile' className={styles.link} activeClassName={styles.active}>
        <p className="text text_type_main-default text_color_inactive">Профиль</p>
      </NavLink>
      <NavLink exact to='/profile/orders' className={styles.link} activeClassName={styles.active}>
        <p className="text text_type_main-default text_color_inactive">История заказов</p>
      </NavLink>
      <NavLink exact to='/login' className={styles.link} activeClassName={styles.active}>
        <p className="text text_type_main-default text_color_inactive">Выход</p>
      </NavLink>
      </nav>

      <form className={styles["cont-input"]}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={userUnfo.name}
          icon={'EditIcon'}
        />
        <EmailInput
          type="email"
          name="email"
          placeholder="Логин"
          value={userUnfo.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={passwordValue}
          icon={'EditIcon'}
        />
      </form>
      
    </div>
    <p className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете
    изменить свои персональные данные</p>
    </>
  );
}

export default ProfilePage;
