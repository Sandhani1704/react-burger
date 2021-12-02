import styles from "./user-orders.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

function UserOrders() {
  return (
    <div className={styles.orders}>
    <div className={styles.container}>
      <ProfileNavigation />
      <div className={styles.content}><p className={`${styles.text} text text_type_main-default text_color_inactive`}>Здесь будет история заказов</p></div>
    </div>
    <p
        className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете просмотреть свою историю заказов
      </p>
    </div>
  );
}

export default UserOrders;
