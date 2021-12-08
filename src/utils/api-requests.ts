import { getCookie } from "./cookies";
import { BASE_URL } from "./constants";

const REGISTRATION_ADDRESS = `${BASE_URL}/auth/register`;
const LOGIN_ADDRESS = `${BASE_URL}/auth/login`;
const GET_USER_ADDRESS = `${BASE_URL}/auth/user`;
const LOGOUT_ADDRESS = `${BASE_URL}/auth/logout`;
const REFRESH_TOKEN_ADDRESS = `${BASE_URL}/auth/token`;
const PASSWORD_RESET_ADDRESS = `${BASE_URL}/password-reset`;
const SET_NEW_PASSWORD = `${BASE_URL}/password-reset/reset`;

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json() 
    : res.json().then((err: any) => Promise.reject(err)); 
};

export function registration(name: string, email: string, password: string) {
  return fetch(REGISTRATION_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then(res => checkResponse(res))
}

export function login(email: string, password: string) {
  return fetch(LOGIN_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkResponse(res))
    //checkResponse(res)
  
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
  
export const refreshToken = async () => {
  const res = await fetch(REFRESH_TOKEN_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  return checkResponse(res)
}

export function updateUser(name: string, email: string, password: string) {
  return fetch(GET_USER_ADDRESS, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(res => checkResponse(res))
}

export function forgotPassword(email: string) {
  return fetch(PASSWORD_RESET_ADDRESS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
  .then(res => checkResponse(res))
}

export function setNewPassword(password: string, token: string) {
  return fetch(SET_NEW_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, token })
    })
    .then(res => checkResponse(res))
  }
