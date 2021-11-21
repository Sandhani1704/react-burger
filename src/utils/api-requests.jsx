import { getCookie, setCookie } from "./cookies";
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

// export const retriableFetch = async (url, options = {}) => {
//   try {
//     const res = await fetch(url, options);
//     const result = await checkResponse(res);
//     return result; // или можно сделать return await; главное дождаться промиса, чтоб catch сработал при ошибке
//   } catch (err) {
//     // сначала убеждаемся, что это не любая ошибка, а нужно токен обновить
//     if (err.message === "jwt expired") {
//       const refreshData = await refreshToken(); // обновляем токен; пытаемся 1 раз, если не сложилось -- падаем с ошибкой
//       localStorage.setItem("refreshToken", refreshData.refreshToken); 
//       setCookie("accessToken", refreshData.accessToken); // тут для примера accessToken храним в куке
//       options.headers ??= {} // если в переданных опциях не было хедеров, добавляем в options пустой объект по ключу headers
//       options.headers.authorization = refreshData.accessToken;
//       const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
//       return await checkResponse(res); // если все равно проваливаемся -- значит не судьба :/
//     } else {
//       throw err;
//     }
//   }
// };

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
