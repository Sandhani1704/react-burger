import React, { useState } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './registration-page.module.css';

function RegistrationPage() {
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');
  const [passwordValue, setPassword] = useState('');

  return (
    <form className={styles.content}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input
        type='text'
        placeholder='Имя'
        name='name'
        onChange={e => setName(e.target.value)}
        value={nameValue}
        size={'default'}
      />
      <Input
        type='email'
        placeholder='E-mail'
        name='email'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        />
      <PasswordInput
        name='password'
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
      />
      <Button type='primary' size='medium'>Зарегистрироваться</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
      Уже зарегистрированы? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
    </form>
  )
}


export default RegistrationPage;