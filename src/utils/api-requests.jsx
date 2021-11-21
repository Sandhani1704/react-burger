import { getCookie } from "./cookies";
import { BASE_URL } from "./constants";

const REGISTRATION_ADDRESS = `${BASE_URL}/auth/register`;
const LOGIN_ADDRESS = `${BASE_URL}/auth/login`;
const GET_USER_ADDRESS = `${BASE_URL}/auth/user`;
const LOGOUT_ADDRESS = `${BASE_URL}/auth/logout`;
const REFRESH_TOKEN_ADDRESS = `${BASE_URL}/auth/token`;
const PASSWORD_RESET_ADDRESS = `${BASE_URL}/password-reset`;
const SET_NEW_PASSWORD = `${BASE_URL}/password-reset/reset`;

const checkResponse = (res) => {
  return res.ok
    ? res.json() 
    : res.json().then((err) => Promise.reject(err)); 
};

export function registration(name, email, password) {
  return fetch(REGISTRATION_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then(res => checkResponse(res))
}

export function login(email, password) {
  return fetch(LOGIN_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkResponse(res))
}

export function getUserInfo() {
  return fetch(GET_USER_ADDRESS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  })
  .then(res => checkResponse(res))
}

export function logOut() {
  return fetch(LOGOUT_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(res => checkResponse(res))
  }

export function refreshToken() {
  return fetch(REFRESH_TOKEN_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(res => checkResponse(res))
}

export function updateUser(name, email, password) {
  return fetch(GET_USER_ADDRESS, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  })
    // .then((res) => {
    //   return res.json();
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return Promise.reject(err);
    // });
    .then(res => checkResponse(res))
}

export function forgotPassword(email) {
  return fetch(PASSWORD_RESET_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
  .then(res => checkResponse(res))
}

export function setNewPassword(password, token) {
  return fetch(SET_NEW_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, token })
    })
    .then(res => checkResponse(res))
  }
