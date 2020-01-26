import React from 'react';
import './Login.scss';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import logo from '../../../../../public/images/logo.svg';

const Login = props => {
  const { userData, error, handleChange, handleSubmit } = props;
  return (
    <div className="login">
      <Form className="login-form" onSubmit={handleSubmit} validateStatus={error}>
        <img className="login-form__logo" src={logo} />
        <p className="login-form__title">Вход</p>
        <Form.Item hasFeedback label="Логин" colon={false}>
          <Input
            size="large"
            placeholder="admin"
            name="login"
            value={userData.login}
            type="login"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          label="Пароль"
          colon={false}
          validateStatus={error}
          help={error ? ' Неверный логин или пароль' : ''}
        >
          <Input.Password
            name="password"
            size="large"
            value={userData.password}
            placeholder="Пароль"
            style={{ color: 'rgba(0,0,0,.25)' }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item className="login-form__button">
          <Button type="primary" size="large" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
