import React, { useState, useEffect, FormEvent } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import styles from './registration-page.module.css';
import { registerUser } from '../../services/actions/user-info';
import { SET_REGISTER_REQUEST_ERROR } from "../../services/actions/user-info";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

function RegistrationPage() {
  const { userUnfo, registerError } = useAppSelector((store) => store.userInfo);
  const dispatch = useAppDispatch();
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');
  const [passwordValue, setPassword] = useState('');

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(nameValue, emailValue, passwordValue))
  }

  useEffect(() => {
    dispatch({ type: SET_REGISTER_REQUEST_ERROR })
  }, [dispatch]);

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
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
      />
      <Button type='primary' size='medium'>Зарегистрироваться</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
      Уже зарегистрированы? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
      {registerError
        ? <p className={`${styles.error} text text_type_main-default mt-10`}>
            {registerError}
          </p>
        : null
      }
    </form>
  )
}


export default RegistrationPage;