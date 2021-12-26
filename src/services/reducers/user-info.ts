import {
  GET_USER_REQUEST,
  SET_USER_INFO,
  REMOVE_USER_INFO,
  RESPONSED_EMAIL,
  SET_LOGIN_REQUEST_ERROR,
  SET_REGISTER_REQUEST_ERROR,
  SET_LOGOUT_REQUEST_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_SUCCESS,

    TUserInfoAction
} from "../actions/user-info";

export type TUserInfoState = {
  userUnfo: { name: string, email: string };
  userRequest: boolean;
  registerError: string;
  loginError: string;
  logOutError: string;
  isResponsedEmail: boolean;
  refreshTokenRequest: boolean;
  refreshTokenError: boolean,
  refreshTokenSuccess: boolean,
}

export const initialState: TUserInfoState = {
  userUnfo: { name: "", email: "" },
  userRequest: false,
  registerError: '',
  loginError: '',
  logOutError: '',
  isResponsedEmail: false,
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenError: false,
};

export const userReducer = (state = initialState, action: TUserInfoAction): TUserInfoState => {
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
        userRequest: false,
        userUnfo: { name: "", email: "" },
      };
    }
    case RESPONSED_EMAIL:
      return {
        ...state,
        isResponsedEmail: true,
      };
      case REFRESH_TOKEN_REQUEST: {
        return {
          ...state,
          refreshTokenRequest: true,
          refreshTokenSuccess: false,
          refreshTokenError: false,
        };
      }
      case REFRESH_TOKEN_SUCCESS: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenSuccess: true,
          refreshTokenError: false,
        };
      }
      case REFRESH_TOKEN_ERROR: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenSuccess: false,
          refreshTokenError: true,
        };
      }
    default: {
      return state;
    }
  }
};
