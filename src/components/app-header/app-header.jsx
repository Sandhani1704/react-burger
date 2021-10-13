import React from "react";
import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderLink from "../app-header-link/app-header-link";

function AppHeader() {
    
    return (
        <header>
            <nav className={`${styles.header}`}>
            <span className={`${styles.left} pl-5 mr-2`}>
                <AppHeaderLink text='Конструктор' Icon={BurgerIcon} />
                <AppHeaderLink text='Лента заказов' Icon={ListIcon} />
                
            </span>
                <span className={styles.center}>
                <Logo/>
            </span>
                <span className={styles.right}>
                <AppHeaderLink text='Личный кабинет' Icon={ProfileIcon}/>
            </span>
            </nav>
        </header>
    )
}

export default AppHeader