import React, { memo, useContext, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { context } from '../../App';
import { useNavigate } from 'react-router-dom';

import axios from "axios";


const SignupForm = memo(() => {
  const [usernameValue, setUsernameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [secondPasswordValue, setSecondPasswordValue] = useState('')
  const [name, setName] = useState("")
  
  const { isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    password,
    setPassword, error, handleLogin, credentials, setCredentials, 
    isAuthorized, setAuthorized, isValid, setValid  } = useContext(context)

    useEffect(()=>{
      if(usernameValue !== "" || passwordValue !== ""){
        console.log(usernameValue , " ", passwordValue)
        console.log(isLoggedIn)

      }
     }, [usernameValue, passwordValue])

     

    const navigate = useNavigate()



    const handleSignUp = () => {
        
        if(isAuthorized){
            console.log("Username alredy exists!")
            return

        }
        if(!isValid){
            console.log("Not valid password!")
            return
        }
        try{
            const nextId = credentials.length > 0 
            ? Math.max(...credentials.map(user => user.id || 0)) + 1 
            : 1;

            const newUser = {id: nextId.toString(), username: usernameValue, password: passwordValue, name };
            axios.post('http://localhost:3031/users', newUser)
            .then(res => {
                alert("You registered successfully!")
                console.log("User signed up successfully!")
                setCredentials([...(credentials || []), newUser]) // always write like this for the case if credentials is empty
                setPasswordValue("")
                setUsernameValue("")
                setSecondPasswordValue("")
                setName("")
                setAuthorized(false)
                setValid(true)
                navigate("/home")
                
            })
            .catch(err => {
                console.log(err)
            })
            console.log("Updated users: " , credentials)
            
            // setAuthorized(false)
            // setValid(true)
            
            return <div><h1>You are successfully registered!</h1></div>
        } catch (error) {
            console.error('Error during signup:', error);
          }
    }

    useEffect(() => {
        if(credentials && usernameValue !== "" && credentials.find((user) => user.username === usernameValue)){
            setAuthorized(true)
        }else setAuthorized(false)

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if(passwordValue !== "" && (passwordValue === secondPasswordValue || passwordValue.length < 8 || !regex.test(passwordValue))){
            setValid(true)
        }else setValid(false)

        console.log("isAuthorized: ", isAuthorized)//default false
        console.log("isValid: ", isValid) //default true

    }, [usernameValue, passwordValue, secondPasswordValue])

    
    

  return(
  <div className="login-box">
    <h2>Signup</h2>
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSignUp}  
    >
        <Form.Item
        label="firstname"
        name="name"
        rules={[{ required: true, message: 'Enter your name!' }]}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="login"
        name="username"
        rules={[{ required: true, message: 'Enter username!' }, {
            validator: (_, value) =>
                credentials && usernameValue !== "" && credentials.find((user) => user.username === usernameValue)
                ? Promise.reject(new Error('Username already exists!'))
                : Promise.resolve(),
          }]}
      >
        <Input value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Enter your password!' }, 
            {
                validator: (_, value) =>
                    (passwordValue && secondPasswordValue) !== "" && passwordValue.length < 8
                    ? Promise.reject(new Error('Password length must at least 8 letters!'))
                    : Promise.resolve(),
              },
              {
                validator: (_, value) =>
                    (passwordValue && secondPasswordValue) !== "" && !(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).test(passwordValue) 
                    ? Promise.reject(new Error('Password must consist at least one letter, one number and one symbol!'))
                    : Promise.resolve(),
              }
        ]}
      >
        <Input.Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="password"
        name="password2"
        rules={[{ required: true, message: 'Enter your password!' },
            {
                validator: (_, value) =>
                    (passwordValue && secondPasswordValue) !== "" && passwordValue !== secondPasswordValue
                    ? Promise.reject(new Error('Confirmed password wrong!'))
                    : Promise.resolve(),
              }
         ]}
      >
        <Input.Password value={secondPasswordValue} onChange={(e) => setSecondPasswordValue(e.target.value)} />
      </Form.Item>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Form.Item>
        <Button type="primary" htmlType="submit">Signup</Button>
      </Form.Item>
      {/* {usernameValue !== "" && credentials.find((user) => user.username === usernameValue) && <p>Username alredy exists!</p>}
        {(passwordValue && secondPasswordValue) !== "" && passwordValue !== secondPasswordValue && <p>Confirmed password wrong!</p>}
        {(passwordValue && secondPasswordValue) !== "" && passwordValue.length < 8 && <p>Password length must at least 8 letters!</p>}
        {(passwordValue && secondPasswordValue) !== "" && !(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/).test(passwordValue) && <p>Password must consist at least one letter, one number and one symbol!</p>} */}

    </Form>
  </div>)

})

export default SignupForm