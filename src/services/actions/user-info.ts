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
import { TUserInfoResponse, AppDispatch, AppThunk } from '../../utils/types'
import { setCookie, getToken, deleteCookie } from "../../utils/cookies";
import { History } from "history";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";
export const RESPONSED_EMAIL = "RESPONSED_EMAIL";
export const SET_LOGIN_REQUEST_ERROR = "SET_LOGIN_REQUEST_ERROR";
export const SET_REGISTER_REQUEST_ERROR = "SET_REGISTER_REQUEST_ERROR";
export const SET_LOGOUT_REQUEST_ERROR = "SET_LOGOUT_REQUEST_ERROR";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR";

export interface IApiResponse {
  success?: boolean;
}

const setAuth = (res: TUserInfoResponse, dispatch: AppDispatch) => {
  setCookie("accessToken", getToken(res.accessToken), { expires: 'Fri, 31 Dec 9999 23:59:59 GMT' }); //, { expires: 'Fri, 31 Dec 9999 23:59:59 GMT' }
  localStorage.setItem("refreshToken", getToken(res.refreshToken));
  dispatch({ type: SET_USER_INFO, user: res.user });
};

export const registerUser = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
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

export const loginUser = (email: string, password: string) => (dispatch: AppDispatch) => {
  login(email, password)
    .then((res) => {
      // console.log(res);
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

export const logout = (history: string[] | History<unknown>) => (dispatch: AppDispatch) => {
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
        // console.log(res.message);
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

export const updateToken: AppThunk = () => (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_REQUEST });
  refreshToken()
    .then((data) => {
      setCookie("accessToken", getToken(data.accessToken), { expires: 'Fri, 31 Dec 9999 23:59:59 GMT' });
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch({ type: REFRESH_TOKEN_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: REFRESH_TOKEN_ERROR });
    });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  getUserInfo()
    .then((res) => {
      // console.log(res)
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
      if (err.message === "jwt expired" || err.message === "Token is invalid") {
        dispatch(updateToken() as any);
      }
      console.log(err);
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
};

export const updateUserInfo = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  updateUser(name, email, password)
    .then((res) => {
      //console.log(res)
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
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        dispatch(updateToken() as any);
        return;
      }
    });
};

export const passwordReset = (email: string, history: string[] | History<unknown>) => (dispatch: (arg0: { type: string; }) => void) => {
  forgotPassword(email)
    .then((res) => {
      if (res.success === true) {
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

export const setNewPasswordValue = (password: string, token: string, history: string[] | History<unknown>) => (dispatch: any) => {
  setNewPassword(password, token)
    .then((res) => {
      if (res.success === true) {
        // console.log(res);
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

type TRefreshTokenSuccess = {
  type: typeof REFRESH_TOKEN_SUCCESS;
}

type TRefreshTokenError = {
  type: typeof REFRESH_TOKEN_ERROR;
}

type TRefreshTokenReQuest = {
  type: typeof REFRESH_TOKEN_REQUEST;
}

type TGetUserRequestAction = {
  type: typeof GET_USER_REQUEST;
}

type TSetUserInfoAction = {
  type: typeof SET_USER_INFO;
  user: { name: string; email: string };
}

type TRemoveUserInfoAction = {
  type: typeof REMOVE_USER_INFO;
}

type TResponsedEmailAction = {
  type: typeof RESPONSED_EMAIL;
}

type TSetLoginRequestErrorAction = {
  type: typeof SET_LOGIN_REQUEST_ERROR;
  message: string;
}

type TSetRegisterRequestErrorAction = {
  type: typeof SET_REGISTER_REQUEST_ERROR;
  message: string;
}

type TSetLogOutRequestErrorAction = {
  type: typeof SET_LOGOUT_REQUEST_ERROR;
  message: string;
}

export type TUserInfoAction = TGetUserRequestAction |
  TSetUserInfoAction | TRemoveUserInfoAction |
  TResponsedEmailAction | TSetLoginRequestErrorAction |
  TSetRegisterRequestErrorAction | TSetLogOutRequestErrorAction | TRefreshTokenReQuest | TRefreshTokenError | TRefreshTokenSuccess
