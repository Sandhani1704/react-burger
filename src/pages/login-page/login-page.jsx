import React, { useState } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './login-page.module.css';

function LoginPage() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');

  return (
    <form className={styles.content}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <Input
        type='email'
        placeholder='E-mail'
        name='email'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        className='mb-6'
        size={'default'}
      />
      <PasswordInput
        name='password'
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
      />
      <Button type='primary' size='medium'>Войти</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы новый пользователь? <NavLink className={styles.link} to='/register'>Зарегистрироваться</NavLink>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль? <NavLink className={styles.link} to='/forgot-password'>Восстановить пароль</NavLink>
      </p>
    </form>
  )
}


export default LoginPage;