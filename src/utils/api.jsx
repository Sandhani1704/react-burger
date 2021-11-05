const BASE_URL = 'https://norma.nomoreparties.space/api';

const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
const ORDER_URL = `${BASE_URL}/orders`;

export function getIngredients() {
    return (
      fetch(INGREDIENTS_URL)
        .then(res => {
          if (res.ok)
            return res.json()
  
          return Promise.reject(res.status)
        })
    )
  }

  export function getOrder(ingredientsId) {
    const data = {"ingredients": ingredientsId };
    return (
      fetch(ORDER_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok)
            return res.json()
            console.log(res)
  
          return Promise.reject(res.status)
        })
    )
  }