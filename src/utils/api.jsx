const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

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