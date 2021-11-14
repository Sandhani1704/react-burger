import { registration, login } from "../../utils/api-requests";
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const SET_USER_INFO = "SET_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";
export const SET_REQUEST_FAILD = "SET_REQUEST_FAILD";

export const registerUser = (name, email, password) => (dispatch) => {
  registration(name, email, password)
    .then((res) => {
      if (res.success === true) {
        dispatch({ type: SET_USER_INFO, user: res.user });
        console.log(res)
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
      .then(res => {
        if (res.success === true) {
            dispatch({ type: SET_USER_INFO, user: res.user });
            console.log(res)
          return
        }
  
        return Promise.reject(res)
      })
      .catch(err => dispatch({ type: SET_REQUEST_FAILD, message: `Ошибка авторизации ${err.message}` }))
  }
