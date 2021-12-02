import React, { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserInfo,
  } from "../../services/actions/user-info";

function ProfilePage() {
  const { userUnfo } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChanged, setIsChanged] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    setUserData({ name: userUnfo.name, email: userUnfo.email, password: "" });
    setIsChanged({ name: false, email: false, password: false });
  }, [userUnfo]);

  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(userData.name, userData.email, userData.password));
  };

  const nameResetHandler = () => {
    setUserData({ ...userData, name: userUnfo.name });
    setIsChanged({ ...isChanged, name: false });
  };

  const emailResetHandler = () => {
    setUserData({ ...userData, email: userUnfo.email });
    setIsChanged({ ...isChanged, email: false });
  };

  const passwordResetHandler = () => {
    setUserData({ ...userData, password: "" });
    setIsChanged({ ...isChanged, password: false });
  };

  const nameChangeHandler = (e) => {
    setUserData({ ...userData, name: e.currentTarget.value });
    e.currentTarget.value !== userUnfo.name
      ? setIsChanged({ ...isChanged, name: true })
      : setIsChanged({ ...isChanged, name: false });
  };

  const emailChangeHandler = (e) => {
    setUserData({ ...userData, email: e.currentTarget.value });
    e.currentTarget.value !== userUnfo.email
      ? setIsChanged({ ...isChanged, email: true })
      : setIsChanged({ ...isChanged, email: false });
  };

  const passwordChangeHandler = (e) => {
    setUserData({ ...userData, password: e.currentTarget.value });
    e.currentTarget.value !== ""
      ? setIsChanged({ ...isChanged, password: true })
      : setIsChanged({ ...isChanged, password: false });
  };

  const resetButtonHandler = () => {
    nameResetHandler();
    emailResetHandler();
    passwordResetHandler();
  };

  const isSomeChanges = Object.values(isChanged).some(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
      <ProfileNavigation />

        <form className={styles["cont-input"]}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            value={userData.name}
            icon={isChanged.name ? "CloseIcon" : "EditIcon"}
            onChange={nameChangeHandler}
            onIconClick={nameResetHandler}
          />
          <Input
            type="email"
            name="email"
            placeholder="Логин"
            value={userData.email}
            onChange={emailChangeHandler}
            onIconClick={emailResetHandler}
            icon={isChanged.email ? "CloseIcon" : "EditIcon"}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={passwordChangeHandler}
            onIconClick={passwordResetHandler}
            icon={isChanged.password ? "CloseIcon" : "EditIcon"}
          />

          {isSomeChanges ? (
            <div className={styles.buttons}>
              <Button
                type="secondary"
                size="medium"
                onClick={resetButtonHandler}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                onClick={handleUpdateUserSubmit}
              >
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      </div>
      <p
        className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfilePage;
