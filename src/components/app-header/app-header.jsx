import React from "react";
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
          <button className={styles.item + " pl-5 pr-5 pt-4 pb-4"}>
            <BurgerIcon type="primary" />
            <p className={"text text_type_main-default ml-2 mr-5"}>
              Конструктор
            </p>
          </button>
          <button className={styles.item + " pl-5 pr-5 pt-4 pb-4"}>
            <ListIcon type="primary" />
            <p className={"text text_type_main-default ml-2 mr-5"}>
              Лента заказов
            </p>
          </button>
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <button className={styles.item__profile + " pl-5 pr-5 pt-4 pb-4"}>
            <ProfileIcon type="primary" />
            <p className={"text text_type_main-default ml-2 mr-5"}>
              Личный кабинет
            </p>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
