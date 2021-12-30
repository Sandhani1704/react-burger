import React, { useEffect, useState, FormEvent } from "react";
import styles from "./profile-page.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import {
  Input,
  Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getUser,
  updateUserInfo,
  } from "../../services/actions/user-info";
import { Loader } from "../../components/ui/loader/loader";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function ProfilePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { userUnfo } = useAppSelector((store) => store.userInfo);
  
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

  const handleUpdateUserSubmit = (e: React.FormEvent) => {
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

  const nameChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.currentTarget.value });
    e.currentTarget.value !== userUnfo.name
      ? setIsChanged({ ...isChanged, name: true })
      : setIsChanged({ ...isChanged, name: false });
  };

  const emailChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.currentTarget.value });
    e.currentTarget.value !== userUnfo.email
      ? setIsChanged({ ...isChanged, email: true })
      : setIsChanged({ ...isChanged, email: false });
  };

  const passwordChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.currentTarget.value });
    e.currentTarget.value !== ""
      ? setIsChanged({ ...isChanged, password: true })
      : setIsChanged({ ...isChanged, password: false });
  };

  const resetButtonHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ name: userUnfo.name, email: userUnfo.email, password: "" });
  };

  const isSomeChanges = Object.values(isChanged).some(Boolean);
  if (!userUnfo.name) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
      <ProfileNavigation text='В этом разделе вы можете изменить свои персональные данные'/>

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
            placeholder="Пароль"
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
    </div>
  );
}

export default ProfilePage;
