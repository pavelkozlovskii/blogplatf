import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { editProfile } from '../../features/userSlice';

import './EditProfile.scss';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isHiddenSuccessfulMessage, setIsHiddenSuccessfulMessage] = useState(true);

  if (!user.user.token) {
    return <Redirect to="/" />;
  }

  const onSubmit = (data) => {
    setIsHiddenSuccessfulMessage(false);
    if (!data.password) {
      dispatch(
        editProfile({
          username: data.username,
          email: data.email,
          image: data.image,
        })
      );
    } else {
      dispatch(
        editProfile({
          username: data.username,
          email: data.email,
          image: data.image,
          password: data.password,
        })
      );
    }
  };

  return (
    <form className="small-container edit-profile" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title edit-profile__title">Edit Profile</h2>

      <p className="edit-profile__subtitle subtitle">Username</p>
      <div className="edit-profile__container-input-with-error">
        <input
          type="text"
          className="input edit-profile__input"
          defaultValue={user.user.username}
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 20,
            onChange: (e) => {
              setIsHiddenSuccessfulMessage(true);
              setValue('username', e.target.value.toLowerCase());
            },
          })}
          minLength="3"
          maxLength="20"
          placeholder="Username"
          required
        />
        {user.errors.username && <p className="edit-profile__error-message">{user.errors.username}</p>}
      </div>

      <p className="edit-profile__subtitle subtitle">Email address</p>
      <div className="edit-profile__container-input-with-error">
        <input
          type="email"
          className="input edit-profile__input"
          defaultValue={user.user.email}
          {...register('email', {
            required: true,
            onChange: (e) => {
              setIsHiddenSuccessfulMessage(true);
              setValue('email', e.target.value.toLowerCase());
            },
          })}
          placeholder="Email address"
          required
        />
        {user.errors.email && <p className="edit-profile__error-message">{user.errors.email}</p>}
      </div>

      <p className="edit-profile__subtitle subtitle">New password</p>
      <div className="edit-profile__container-input-with-error">
        <input
          type="password"
          className="input"
          {...register('password', {
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
            maxLength: { value: 40, message: 'Your password must not be more than 40 characters long' },
            onChange: () => setIsHiddenSuccessfulMessage(true),
          })}
          placeholder="New password"
        />
        {errors.password && <p className="edit-profile__error-message">{errors.password.message}</p>}
        {/* { oldPassword !== user.user.password && viewSuccessfulMessageAndUpdateOldPassword()} */}
      </div>
      <p className="edit-profile__subtitle subtitle">Avatar image (url)</p>
      <input
        type="url"
        defaultValue={user.user.image}
        className="input edit-profile__input"
        {...register('image', {
          onChange: (e) => {
            setIsHiddenSuccessfulMessage(true);
            setValue('image', e.target.value.toLowerCase());
          },
        })}
        placeholder="Avatar image"
      />
      <button className="button edit-profile__button">Save</button>
      {user.errors.editProfileError && <p className="edit-profile__error-message">{user.errors.editProfileError}</p>}
      {!user.errors.editProfileError &&
        !user.errors.email &&
        !user.errors.username &&
        !isHiddenSuccessfulMessage &&
        user.status === 'resolved' && (
        <p className="edit-profile__successful-message-on-button">The data change was successful</p>
      )}
    </form>
  );
};

export default EditProfile;
