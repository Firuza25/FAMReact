import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { context } from '../../App';
import { useNavigate } from 'react-router-dom';
import "./contnent.css"
import axios from "axios";


const LoginForm = () => {

  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  
  const { isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    password,
    setPassword, error, setError,  setCredentials, memoizedCredentials, setActiveUser  } = useContext(context)

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
    
    //  const handleLogin = useCallback(() => {
    //   console.log("Credentials when handling login: ", memoizedCredentials)
    //   const foundUser = memoizedCredentials.find(
    //     (user) => user.username === usernameValue &&
    //               user.password === passwordValue
    //   );
    //   console.log(foundUser)
    //   console.log("passwordValue: ", passwordValue)
    //   console.log("usernameValue: ", usernameValue)
    //   if (foundUser && memoizedCredentials) {
    //     setIsLoggedIn(true);
    //     setError('');
    //     setUsername(username);
    //     setPassword(password);
    //     navigate("/home")
    //   } else {
    //     setError('Invalid login information. Try again.');
    //   }

      
    // }, [username, password]);
    const handleLogin = useCallback(async () => {
      try {
        console.log("Fetching users during login...");
    
        // Fetch users directly from the API
        const response = await axios.get('http://localhost:3031/users');
        const users = response.data;
    
        console.log("Fetched users: ", users);
    
        // Find the user in the fetched data
        const foundUser = users.find(
          (user) => user.username === usernameValue && user.password === passwordValue
        );
    
        if (foundUser) {
          setIsLoggedIn(true);
          setError('');
          setUsername(foundUser.username);
          setPassword(foundUser.password);
          setActiveUser(foundUser)
          navigate("/home");
        } else {
          setError('Invalid login information. Try again.');
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError('Failed to log in. Please try again later.');
      }
    }, [usernameValue, passwordValue, navigate, setIsLoggedIn, setError, setUsername, setPassword]);
    

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