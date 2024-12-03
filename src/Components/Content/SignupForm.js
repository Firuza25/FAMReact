import React, { useState, useEffect, memo } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setCredentials, authorize, validate } from '../../store';

const SignupForm = memo(() => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [secondPasswordValue, setSecondPasswordValue] = useState('');
  const [name, setName] = useState('');

  const { isLoggedIn, error } = useSelector((state) => state.data);

  
  const dispatch = useDispatch();
  const { credentials, isAuthorized, isValid } = useSelector((state) => state.data);

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (isAuthorized) {
      console.log("Username already exists!");
      return;
    }

    if (!isValid) {
      console.log("Invalid password!");
      return;
    }

    try {
      const nextId = credentials.length > 0
        ? Math.max(...credentials.map(user => user.id || 0)) + 1
        : 1;

      const newUser = { id: nextId.toString(), username: usernameValue, password: passwordValue, name };
      axios.post('http://localhost:3031/users', newUser)
        .then(() => {
          alert("You registered successfully!");
          dispatch(setCredentials([...credentials, newUser]));
          dispatch(authorize(false));  // Correct action for isAuthorized
          dispatch(validate(true));    // Correct action for isValid
          navigate("/home");
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  useEffect(() => {
    if (credentials && usernameValue !== "" && credentials.find((user) => user.username === usernameValue)) {
      dispatch(authorize(true));  // Correct action for isAuthorized
    } else {
      dispatch(authorize(false));  // Correct action for isAuthorized
    }

    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (passwordValue !== "" && (passwordValue === secondPasswordValue || passwordValue.length < 8 || !regex.test(passwordValue))) {
      dispatch(validate(true));  // Correct action for isValid
    } else {
      dispatch(validate(false));  // Correct action for isValid
    }
  }, [usernameValue, passwordValue, secondPasswordValue, credentials, dispatch]);

  return (
    <div className="login-box">
      <h2>Signup</h2>
      <Form name="signup-form" initialValues={{ remember: true }} onFinish={handleSignUp}>
        <Form.Item label="firstname" name="name" rules={[{ required: true, message: 'Enter your name!' }]}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item label="username" name="username" rules={[{ required: true, message: 'Enter username!' }]}>
          <Input value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} />
        </Form.Item>

        <Form.Item label="password" name="password" rules={[{ required: true, message: 'Enter password!' }]}>
          <Input.Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
        </Form.Item>

        <Form.Item label="confirm password" name="password2" rules={[{ required: true, message: 'Confirm your password!' }]}>
          <Input.Password value={secondPasswordValue} onChange={(e) => setSecondPasswordValue(e.target.value)} />
        </Form.Item>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Form.Item>
          <Button type="primary" htmlType="submit">Signup</Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default SignupForm;
