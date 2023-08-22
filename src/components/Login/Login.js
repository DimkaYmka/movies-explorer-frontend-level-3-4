import React, { useEffect } from 'react';
import Auth from '../Auth/Auth';
import useValidation from '../../hooks/useValidationHook';
import { useNavigate } from 'react-router-dom';
const Login =  ({ onAuthorize, isLoading, loggedIn }) => {
  const { values, errors, handleChange, isValid } = useValidation();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        onAuthorize({
            email: values.email,
            password: values.password,
        });
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/movies');
        }
    }, [loggedIn]);

    return(
        <Auth
            title={"Рады видеть!"}
            buttonText={"Войти"}
            question={"Еще не зарегестрированы?"}
            linkText={" Регистрация"}
            link={"/signup"}
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            isLoading={isLoading}
        >

        <label className='auth__input-label'>
            E-mail
            <input
                name='email'
                className={`auth__input-row ${errors.email ? 'auth__input-row_error' : ''}`}
                id='email-input'
                type='email'
                placeholder="Введите почту"
                minLength="2"
                maxLength="40"
                required={true}
                onChange={handleChange}
                value={values.email || ''}
                pattern="^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$"
            />
            <span className='auth-form__span-error'>{errors.email}</span>
        </label>
        <label className='auth__input-label'>
            Пароль
            <input
                name='password'
                className={`auth__input-row ${errors.password ? 'auth__input-row_error' : ''}`}
                id='password-input'
                type='password'
                placeholder="Введите пароль"
                minLength="6"
                required
                onChange={handleChange}
                value={values.password || ''}
            />
            <span className='auth-form__span-error'>{errors.password}</span>
        </label>
        </Auth>
    )
}

export default Login

