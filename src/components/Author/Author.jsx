import React, { useState } from 'react';
import { format } from 'date-fns';

import authorIcon from '../../assets/icons/user.png';

const Author = ({ author, dataOfUpdate }) => {
  const [image, setImage] = useState(author.image);

  return (
    <div className="person">
      <div className="person__description">
        <p className="person__name">{author.username}</p>
        <p className="person__date-of-publication">{format(dataOfUpdate, 'PP')}</p>
      </div>
      <img src={image} className="person__image" onError={() => setImage(authorIcon)} alt="icon author" />
    </div>
  );
};

export default Author;
