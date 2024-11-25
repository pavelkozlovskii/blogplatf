import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signUp } from '../../features/userSlice';

import './SignUp.scss';

const SignUp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      signUp({
        email: data.email,
        username: data.username,
        password: data.password,
      })
    );
  };

  if (user.user.token) {
    return <Redirect to="/" />;
  }

  return (
    <form className="small-container sign-up" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title sign-up__title">Create new account</h2>

      <p className="sign-up__subtitle subtitle">Username</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="text"
          className="input"
          {...register('username', {
            minLength: 3,
            maxLength: 20,
            onChange: (e) => setValue('username', e.target.value.toLowerCase()),
          })}
          minLength="3"
          maxLength="20"
          placeholder="Username"
          required
        />
        {user.errors.username && <p className="sign-up__error-message">{user.errors.username}</p>}
      </div>

      <p className="sign-up__subtitle subtitle">Email address</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="email"
          className="input"
          {...register('email', { required: true, onChange: (e) => setValue('email', e.target.value.toLowerCase()) })}
          placeholder="Email address"
          required
        />
        {user.errors.email && <p className="sign-up__error-message">{user.errors.email}</p>}
      </div>
      <p className="sign-up__subtitle subtitle">Password</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="password"
          className="input"
          {...register('password', {
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
            maxLength: { value: 40, message: 'Your password must not be more than 40 characters long' },
          })}
          placeholder="Password"
          required
        />
        {errors.password && <p className="sign-up__error-message">{errors.password.message}</p>}
      </div>

      <p className="sign-up__subtitle subtitle">Repeat Password</p>
      <div className="sign-up__container-input-with-error">
        <input
          type="password"
          className="input"
          placeholder="Password"
          {...register('confirmPassword', {
            required: true,
            validate: (value) => {
              if (watch('password') != value) {
                return 'Passwords must match';
              }
            },
          })}
          required
        />
        {errors.confirmPassword && <p className="sign-up__error-message">{errors.confirmPassword.message}</p>}
      </div>

      <div className="sign-up__access-to-personal-information">
        <input
          className="sign-up__access-to-personal-information-checkbox"
          id="access"
          type="checkbox"
          {...register('checkbox', { required: true })}
          required
        />
        <label htmlFor="access" className="sign-up__access-to-personal-information-text">
          I agree to the processing of my personal information
        </label>
      </div>

      <button className="button sign-up__button">Create</button>
      {!user.errors.signUpError && (
        <p className="sign-up__error-message sign-up__error-message-on-button">{user.errors.signUpError}</p>
      )}
      <p className="sign-up__have-an-account-text">
        Already have an account? <Link to="sign-in">Sign In</Link>.
      </p>
    </form>
  );
};

export default SignUp;
