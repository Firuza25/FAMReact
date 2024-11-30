import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { context } from '../../App';
import { useNavigate } from 'react-router-dom';
import "./contnent.css"

const LoginForm = () => {

  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const { isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    password,
    setPassword, error, setError, credentials, setCredentials  } = useContext(context)

    useEffect(() => {
      console.log("Context in LoginForm:", isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        password,
        setPassword, error, setError, handleLogin);
    }, []);
  
    const navigate = useNavigate()

    useEffect(()=>{
      if(usernameValue !== "" || passwordValue !== ""){
        console.log(usernameValue , " ", passwordValue)
        console.log(isLoggedIn)

      }
     }, [usernameValue, passwordValue])
    
     const handleLogin = useCallback(() => {
      
      console.log("Credentials when handling login: ", credentials)
      const foundUser = credentials.find(
        (user) => user.username === usernameValue && user.password === passwordValue
      );
      console.log(foundUser)
      if (foundUser && credentials) {
        setIsLoggedIn(true);
        setError('');
        // setIsModalVisible(false); 
        setUsername(username);
        setPassword(password);
        navigate("/home")
      } else {
        setError('Invalid login information. Try again.');
      }
    }, [username, password]);

  return(
  <div className="login-box">
    <h2>Login</h2>
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}  
    >
      <Form.Item
        label="login"
        name="username"
        rules={[{ required: true, message: 'Enter your name!' }]}
      >
        <Input value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Enter your password!' }]}
      >
        <Input.Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      </Form.Item>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  </div>)
};

export default LoginForm;