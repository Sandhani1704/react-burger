import React from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import IngredientDetails from "../ingredient-details/ingredient-details";
// import OrderDetails from "../order-details/order-details";
// import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import { useSelector } from 'react-redux';
//import { getIngredients } from "../../utils/api";
//import { orderData } from '../../utils/order-data';

function Main() {
  //const [ingredients, setIngredients] = React.useState([]);
  
  //const [orderDetailsModal, setOrderDetailsModal] = React.useState(false);
  //const [selectedIngredient, setSelectedIngredient] = React.useState({});
// const url = 'https://norma.nomoreparties.space/api/orders';
  

  // const orderDetailsModalClick = () => {
  //   if (orderDetailsModal) return;
  //   setOrderDetailsModal(true);
  // };

  // const onModalHideClick = () => {
  //   setPopupOpen(false);
  //   setOrderDetailsModal(false);
  // };

  // React.useEffect(() => {
  //   getIngredients()
  //     .then((res) => {
  //       if (res) {
  //         const initialDatas = Object.values(res.data);
  //         setIngredients(initialDatas);
  //       }
  //     })
  //     .catch((err) => console.log(`Ошибка сервера: ${err}`));
  // }, []);
  // const { addedIngredients } = useSelector(
  //   (state) => state.burgersConstructor
  // );
  //const numberOrder = useSelector((state) => state.burgersConstructor.numberOrder)

  //const allItemsId = addedIngredients.map(item => item._id)
// console.log(allItemsId)
//   const sentData = async (url) => {
//     const data = {"ingredients": ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"] };
//     console.log(JSON.stringify(data));
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
//     if (response.ok) {
//         console.log(response);
        
//         const json = await response.json();
//         return json.data;
        
//     } else {
//         throw new Error(response.status.toString());
//     }
// }
// function getOrder(ingredientsId) {
//   const data = {"ingredients": ingredientsId };
//   return (
//     fetch('https://norma.nomoreparties.space/api/orders', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
      
//       body: JSON.stringify(data)
//     })
//       .then(res => {
//         if (res.ok)
//           return res.json()
          

//         return Promise.reject(res.status)
//       })
//   )
// }

// useEffect(() => {
  
//   getOrder(["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"])
// }, [allItemsId])

  return (
    <main className={` ${styles.main} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
      <div className={styles.content}>
        <BurgerIngredients
          //ingredients={ingredients}
          //onIngredientClick={onIngredientClick}
        />
        <BurgerConstructor
          //ingredients={ingredients}
          // orderDetailsModalClick={orderDetailsModalClick}
        />
      </div>
      </DndProvider>
      
    </main>
  );
}

export default Main;
