import React, { useState } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import styles from './registration-page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/actions/user-info';

function RegistrationPage() {
  const { userUnfo } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();
  console.log(userUnfo)
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');
  const [passwordValue, setPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(nameValue, emailValue, passwordValue))
  }

  if (userUnfo.email)
    return <Redirect to='/' exact={true}/>

  return (
    <form className={styles.content} onSubmit={handleRegisterSubmit}>
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