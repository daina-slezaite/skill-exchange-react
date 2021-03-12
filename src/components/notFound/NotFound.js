import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => (
  <div className='error-page'>
    <img src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615588689/error_b1hny1.png' alt='Route not found'/>
    <h1>404 - Page Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;