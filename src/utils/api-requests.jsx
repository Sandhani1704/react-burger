const BASE_URL = 'https://norma.nomoreparties.space/api';
const REGISTRATION_ADDRESS = `${BASE_URL}/auth/register`;
const LOGIN_ADDRESS = `${BASE_URL}/auth/login`

export function registration(name, email, password) {
    return (
      fetch(REGISTRATION_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      })
        .then(res => {
          if (res.ok)
            return res.json()
  
          return Promise.reject(res.status)
        })
    )
  }

  export function login(email, password) {
    return (
      fetch(LOGIN_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
        .then(res => {
          if (res.ok)
            return res.json()
  
          return Promise.reject(res.status)
        })
    )
  }