import {
  GET_USER_REQUEST,
  SET_USER_INFO,
  REMOVE_USER_INFO,
  RESPONSED_EMAIL,
  SET_LOGIN_REQUEST_ERROR,
  SET_REGISTER_REQUEST_ERROR,
  SET_LOGOUT_REQUEST_ERROR,
} from "../actions/user-info.jsx";

export const initialState = {
  userUnfo: { name: "", email: "" },
  userRequest: false,
  registerError: '',
  loginError: '',
  logOutError: '',
  isResponsedEmail: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userRequest: false,
        userUnfo: action.user,
      };
    }
    case SET_REGISTER_REQUEST_ERROR: {
      return {
        ...state,
        registerError: action.message,
      };
    }
    case SET_LOGIN_REQUEST_ERROR: {
      return {
        ...state,
        loginError: action.message,
      };
    }
    case SET_LOGOUT_REQUEST_ERROR: {
      return {
        ...state,
        logOutError: action.message,
      };
    }
    case REMOVE_USER_INFO: {
      return {
        ...state,
        userRequestFaild: false,
        userUnfo: { name: "", email: "" },
      };
    }
    case RESPONSED_EMAIL:
      return {
        ...state,
        isResponsedEmail: true,
      };
    default: {
      return state;
    }
  }
};
