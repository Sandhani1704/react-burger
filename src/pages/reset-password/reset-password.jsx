import React, { useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect, useHistory } from "react-router-dom";
import styles from './reset-password.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPasswordValue} from '../../services/actions/user-info';

function ResetPassword() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { isResponsedEmail } = useSelector((store) => store.userInfo);
  const [passwordValue, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(setNewPasswordValue(passwordValue, code, history))
  }

  if (!isResponsedEmail)
    return <Redirect to='/login' />
  
  return (
    <form className={styles.content} onSubmit={handlePasswordSubmit}>
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