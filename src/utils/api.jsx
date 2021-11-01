const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export function getIngredients() {
    return (
      fetch(BASE_URL)
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