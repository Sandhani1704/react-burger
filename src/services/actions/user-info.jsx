import {
  registration,
  login,
  logOut,
  getUserInfo,
  refreshToken,
  updateUser,
  forgotPassword,
  setNewPassword,
} from "../../utils/api-requests";

import { setCookie, getToken } from "../../utils/cookies";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";
export const RESPONSED_EMAIL = "RESPONSED_EMAIL";
export const SET_LOGIN_REQUEST_ERROR = "SET_LOGIN_REQUEST_ERROR";
export const SET_REGISTER_REQUEST_ERROR = "SET_REGISTER_REQUEST_ERROR";
export const SET_LOGOUT_REQUEST_ERROR = "SET_LOGOUT_REQUEST_ERROR";

const setAuth = (res, dispatch) => {
  setCookie("accessToken", getToken(res.accessToken));
  //setCookie("accessToken", getToken(res.accessToken));
  localStorage.setItem("refreshToken", getToken(res.refreshToken));
  dispatch({ type: SET_USER_INFO, user: res.user });
};

export const registerUser = (name, email, password) => (dispatch) => {
  registration(name, email, password)
    .then((res) => {
      if (res.success === true) {
        setAuth(res, dispatch);
        return;
      }
      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: SET_REGISTER_REQUEST_ERROR,
        message: `Ошибка регистрации: ${err.message}`,
      })
    );
};

export const loginUser = (email, password) => (dispatch) => {
  login(email, password)
    .then((res) => {
      console.log(res);
      if (res.success === true) {
        setAuth(res, dispatch);
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: SET_LOGIN_REQUEST_ERROR,
        message: `Ошибка авторизации: ${err.message}`,
      })
    );
};

export const logout = (history) => (dispatch) => {
  logOut()
    .then((res) => {
      if (res.success === true) {
        localStorage.removeItem("refreshToken");
        setCookie("accessToken", "", { expires: 0 });
        dispatch({ type: REMOVE_USER_INFO });
        history.push("/login");
        return;
      } else {
        history.push("/profile");
        console.log(res.message);
        return Promise.reject(res);
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_LOGOUT_REQUEST_ERROR,
        message: `Ошибка сервера ${err.message}`,
      });
      history.push("/profile");
    });
};

export const getUser = () => (dispatch) => {
  getUserInfo()
    .then((res) => {
      if (res.success === true) {
        dispatch({
          type: SET_USER_INFO,
          user: res.user,
        });
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "jwt expired") {
        dispatch(updateToken(getUser));
      }
    });
};

export const updateUserInfo = (name, email, password) => (dispatch) => {
  updateUser(name, email, password)
    .then((res) => {
    if (res.success === true) {
        dispatch({
          type: SET_USER_INFO,
          user: res.user,
        });
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "jwt expired") {
        dispatch(updateToken(updateUserInfo, name, email, password));
        return;
      }
    });
};

export const updateToken = (getUser, ...args) => (dispatch) => {
  refreshToken()
    .then((data) => {
      console.log(data)
      setCookie("accessToken", getToken(data.accessToken));
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch(getUser(...args));
    })
    .catch((err) => dispatch({ type: REMOVE_USER_INFO }));
};

export const passwordReset = (email, history) => (dispatch) => {
  forgotPassword(email)
    .then((res) => {
      if (res.success === true) {
        console.log(res);

        dispatch({
          type: RESPONSED_EMAIL,
        });
        history.push("/reset-password");
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const setNewPasswordValue = (password, token, history) => (dispatch) => {
  setNewPassword(password, token)
    .then((res) => {
      if (res.success === true) {
        console.log(res);
        history.push("/login");
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
