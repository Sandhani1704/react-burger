import React, { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './forgot-password.module.css';

function ForgotPassword() {
  const [emailValue, setEmail] = useState('');
  
  return (
    <form className={styles.content}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input
        type='email'
        placeholder='Укажите e-mail'
        name='email'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        className='mb-6'
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