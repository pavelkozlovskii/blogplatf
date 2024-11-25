import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import authorIcon from '../../assets/icons/user.png';

const User = () => {
  const user = useSelector((state) => state.user);
  const image = user.user.image ? user.user.image : authorIcon;
  const [stateImage, setStateImage] = useState(image);

  useEffect(() => {
    setStateImage(image);
  }, [image]);

  if (!user.user.username) {
    return;
  }

  return (
    <div className="person">
      <div className="person__description">
        <p className="person__name">{user.user.username}</p>
      </div>
      <img src={stateImage} className="person__image" alt="icon user" onError={() => setStateImage(authorIcon)} />
    </div>
  );
};

export default User;
