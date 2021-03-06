import React, { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { useHistory } from "react-router-dom";
import { passwordReset } from '../../services/actions/user-info';
import { useAppDispatch } from "../../utils/hooks";

function ForgotPassword() {
  const history = useHistory()
  const [emailValue, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(passwordReset(emailValue, history))
  }
  
  return (
    <form className={styles.content} onSubmit={handlePasswordSubmit}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        type='email'
        placeholder='Укажите e-mail'
        name='email'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        size={'default'}
      />
    <Button type='primary' size='medium'>Восстановить</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
      Вспомнили пароль? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
    </form>
  )
}


export default ForgotPassword;