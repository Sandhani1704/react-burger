import {
    GET_USER_REQUEST,
    SET_USER_INFO,
    REMOVE_USER_INFO,
    SET_REQUEST_FAILD,
    } from "../actions/user-info.jsx";

    export const initialState = {
        userUnfo: {},
        userRequest: false,
        userRequestFaild: false,
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
          case SET_REQUEST_FAILD: {
            return {
              ...state,
              orderRequestFaild: true,
            };
          }
          case REMOVE_USER_INFO: {
            return {
              ...state,
              userRequestFaild: false,
              userUnfo: {},
            };
          }
        default: {
            return state;
          }
        }
      };