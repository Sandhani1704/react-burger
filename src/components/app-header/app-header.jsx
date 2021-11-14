import React from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={`${styles.content}`}>
        <div className={`${styles.left} pl-5 mr-2`}>
          <NavLink className={styles.item + " pl-5 pr-5 pt-4 pb-4"} exact to='/' activeClassName={styles.active}>
            <BurgerIcon />
            <p className={"text text_type_main-default ml-2 mr-5"}>
              Конструктор
            </p>
          </NavLink>
          <NavLink className={styles.item + " pl-5 pr-5 pt-4 pb-4"} exact to='/profile/orders' activeClassName={styles.active}>
            <ListIcon />
            <p className={"text text_type_main-default ml-2 mr-5 text_color_inactive"}>
              Лента заказов
            </p>
          </NavLink>
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <NavLink className={styles.right + " pl-5 pr-5 pt-4 pb-4"} exact to='/profile' activeClassName={styles.active}>
            <ProfileIcon />
            <p className={"text text_type_main-default ml-2 mr-5"}>
              Личный кабинет
            </p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
