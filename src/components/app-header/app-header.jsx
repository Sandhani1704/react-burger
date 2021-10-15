import React from "react";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderLink from "../app-header-link/app-header-link";

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.content}`}>
        <div className={`${styles.left} pl-5 mr-2`}>
          <AppHeaderLink text="Конструктор" Icon={BurgerIcon} />
          <AppHeaderLink text="Лента заказов" Icon={ListIcon} />
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <AppHeaderLink text="Личный кабинет" Icon={ProfileIcon} />
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
