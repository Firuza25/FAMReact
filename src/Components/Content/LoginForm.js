import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setError, setActiveUser } from '../../store';
import "./contnent.css";

const LoginForm = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const { isLoggedIn, error } = useSelector((state) => state.data);

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3031/users');
      const users = response.data;

      const foundUser = users.find(
        (user) => user.username === usernameValue && user.password === passwordValue
      );

      if (foundUser) {
        dispatch(setLogin(true));
        dispatch(setActiveUser(foundUser));
        navigate("/home");
      } else {
        dispatch(setError('Invalid login information. Try again.'));
      }
    } catch (error) {
      dispatch(setError('Failed to log in. Please try again later.'));
    }
  }, [usernameValue, passwordValue, navigate, dispatch]);

  return (
    <div className="login-box">
      <h2>Login</h2>
      <Form name="login-form" initialValues={{ remember: true }} onFinish={handleLogin}>
        <Form.Item label="login" name="username" rules={[{ required: true, message: 'Enter your name!' }]}>
          <Input value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} />
        </Form.Item>

        <Form.Item label="password" name="password" rules={[{ required: true, message: 'Enter your password!' }]}>
          <Input.Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
        </Form.Item>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Form.Item>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
