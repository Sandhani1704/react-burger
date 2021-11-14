import React, { useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './forgot-password.module.css';

function ResetPassword() {
  const [passwordValue, setPassword] = useState('');
  const [code, setCode] = useState('');
  
  return (
    <form className={styles.content}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <PasswordInput
        name='password'
        type='password'
        placeholder='Введите новый пароль'
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
      />
      <Input
        type='text'
        placeholder='Введите код из письма'
        name='code'
        onChange={e => setCode(e.target.value)}
        value={code}
        />
    <Button type='primary' size='medium'>Восстановить</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
      Вспомнили пароль? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
    </form>
  )
}


export default ResetPassword;