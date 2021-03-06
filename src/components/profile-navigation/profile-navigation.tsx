import React, { FC, FormEvent } from "react";
import styles from "./profile-navigation.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../services/actions/user-info";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
type TProfileNavigationProps = {
  text: string;
}

const ProfileNavigation: FC<TProfileNavigationProps> = ({ text }) => {
  const dispatch = useAppDispatch();
  
  const { logOutError } = useAppSelector((state) => state.userInfo);
  
  const history = useHistory();

  const handleLogOut = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logout(history));
    history.replace({ pathname: "/login" });
  };

  return (
    <nav className={styles.nav}>
      <NavLink
        exact
        to="/profile"
        className={styles.link}
        activeClassName={styles.active}
      >
        <p className="text text_type_main-default text_color_inactive">
          Профиль
        </p>
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={styles.link}
        activeClassName={styles.active}
      >
        <p className="text text_type_main-default text_color_inactive">
          История заказов
        </p>
      </NavLink>
      <NavLink
        exact
        to="/login"
        className={styles.link}
        activeClassName={styles.active}
        onClick={handleLogOut}
      >
        <p className="text text_type_main-default text_color_inactive">Выход</p>
      </NavLink>
      {logOutError
        ? <p className={`${styles.error} text text_type_main-default mt-10`}>
            {logOutError}
          </p>
        : null
      }
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}
      >
        {text}
      </p> 
    </nav>
  );
}

export default ProfileNavigation;
