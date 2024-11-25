import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteUser } from '../../features/userSlice';
import { changeStateReRender } from '../../features/articlesSlice';

import './AccountAccessControlLinks.scss';

const AccountAccessControlLinks = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (user.user.token) {
    return (
      <Link
        to="/"
        className="account-access-control-links__link account-access-control-links__link--gray account-access-control-links__link--margin-left"
        onClick={() => {
          dispatch(deleteUser());
          dispatch(changeStateReRender(true));
        }}
      >
        Log Out
      </Link>
    );
  }

  return (
    <div className="account-access-control-links">
      <Link to="/sign-in" className="account-access-control-links__link">
        Sign In
      </Link>
      <Link to="/sign-up" className="account-access-control-links__link account-access-control-links__link--green">
        Sign Up
      </Link>
    </div>
  );
};

export default AccountAccessControlLinks;
