import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signIn } from '../../features/userSlice';

import './SignIn.scss';

const SignIn = () => {
  const { handleSubmit, setValue, register } = useForm();

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onSubmit = (data) => dispatch(signIn(data));

  if (user.user.token) {
    return <Redirect to="/" />;
  }

  return (
    <form className="sign-in small-container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title sign-in__title">Sign In</h2>

      <p className="sign-in__subtitle subtitle">Email address</p>
      <input
        type="email"
        className="input sign-in__input"
        {...register('email', { required: true, onChange: (e) => setValue('email', e.target.value.toLowerCase()) })}
        placeholder="Email address"
        required
      />

      <p className="sign-in__subtitle subtitle">Password</p>
      <div className="sign-in__container-input-with-error">
        <input
          type="password"
          className="input"
          {...register('password', { required: true })}
          placeholder="Password"
          required
        />
        {user.errors.incorrectPasswordOrEmail && (
          <p className="sign-in__error-message">{user.errors.incorrectPasswordOrEmail}</p>
        )}
      </div>

      <button className="button sign-in__button">Login</button>
      {user.errors.signInError && (
        <p className="sign-in__error-message sign-in__error-message-on-button">{user.errors.signInError}</p>
      )}
      <p className="sign-in__have-an-account-text">
        Don’t have an account? <Link to="sign-up">Sign Up</Link>.
      </p>
    </form>
  );
};

export default SignIn;
