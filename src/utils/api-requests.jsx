import { getCookie } from "./cookies";

const BASE_URL = "https://norma.nomoreparties.space/api";
const REGISTRATION_ADDRESS = `${BASE_URL}/auth/register`;
const LOGIN_ADDRESS = `${BASE_URL}/auth/login`;
const GET_USER_ADDRESS = `${BASE_URL}/auth/user`;
const LOGOUT_ADDRESS = `${BASE_URL}/auth/logout`;
const REFRESH_TOKEN_ADDRESS = `${BASE_URL}/auth/token`;
export const SET_USER_INFO = "SET_USER_INFO";

export function registration(name, email, password) {
  return fetch(REGISTRATION_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

export function login(email, password) {
  return fetch(LOGIN_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  });
}

export function getUserInfo() {
  return fetch(GET_USER_ADDRESS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(res.status);
  });
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
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(res.status);
  });
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
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(res.status);
  });
}

export function updateUser(name, email, password) {
  return fetch(GET_USER_ADDRESS, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(res.status);
  });
}
