import React from 'react';

import Author from '../Author';
import User from '../User';

import './Person.scss';

const Person = ({ isAuthor = false, author = null, dataOfUpdate }) => {
  if (author || isAuthor) {
    return <Author author={author} dataOfUpdate={dataOfUpdate} />;
  }

  return <User />;
};

export default Person;
