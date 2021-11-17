import {
  registration,
  login,
  logOut,
  getUserInfo,
  refreshToken,
  updateUser,
} from "../../utils/api-requests";
import { getCookie, setCookie, getToken } from "../../utils/cookies";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";
export const SET_REQUEST_FAILD = "SET_REQUEST_FAILD";
export const GET_USER_INFO_REQUEST_ERROR = "GET_USER_INFO_REQUEST_ERROR";
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'; 
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

const setAuth = (res, dispatch) => {
  setCookie("accessToken", getToken(res.accessToken), {
    expires: 24 * 60 * 60,
  });
  localStorage.setItem("refreshToken", getToken(res.refreshToken));
  //localStorage.removeItem('resetPassword');
  dispatch({ type: SET_USER_INFO, user: res.user });
};

export const registerUser = (name, email, password) => (dispatch) => {
  registration(name, email, password)
    .then((res) => {
      if (res.success === true) {
        //dispatch({ type: SET_USER_INFO, user: res.user });
        //console.log(res)
        setAuth(res, dispatch);
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: SET_REQUEST_FAILD,
        message: `Ошибка регистрации ${err.message}`,
      })
    );
};

export const loginUser = (email, password) => (dispatch) => {
  login(email, password)
    .then((res) => {
      if (res.success === true) {
        //dispatch({ type: SET_USER_INFO, user: res.user });
        setAuth(res, dispatch);
        //console.log(getCookie("accessToken"))
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: SET_REQUEST_FAILD,
        message: `Ошибка авторизации ${err.message}`,
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
        history.push('/login');
        return;
      }

      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: SET_REQUEST_FAILD,
        message: `Ошибка авторизации ${err.message}`,
      })
    );
};

export const updateToken = (cb) => (dispatch) => {
  refreshToken()
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        setCookie("accessToken", res.data.accessToken);
        cb();
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          token: res.data,
        });
      } else {
        dispatch({
          type: REFRESH_TOKEN_ERROR,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: REFRESH_TOKEN_ERROR,
      });
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
      dispatch({
        type: GET_USER_INFO_REQUEST_ERROR,
      });
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
    dispatch({
      type: GET_USER_INFO_REQUEST_ERROR,
    });
    if (err.message === "jwt expired") {
      dispatch(updateToken(getUser));
    } 
  });
}
