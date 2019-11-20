import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Login } from '../../components';
import usersBase from '../../usersBase.json';
import { authActions } from '../../actions';

const Auth = ({ history, userLogin }) => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/');
    }
  });
  const handleChange = event => {
    const { value } = event.target;
    const { name } = event.currentTarget;
    setUserData(() => ({
      ...userData,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    usersBase.forEach(item => {
      if (item.login === userData.login && item.password === userData.password) {
        const token = Math.floor(Math.random() * Math.floor(10000));
        localStorage.setItem('token', token);
        localStorage.setItem('login', item.login);
        userLogin(item.login);
        history.push('/');
      } else {
        setError('error');
      }
    });
  };

  return (
    <Login
      userData={userData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};
export default withRouter(
  connect(
    null,
    authActions
  )(Auth)
);
Auth.propTypes = {
  history: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired
};
