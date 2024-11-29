import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, error }) => (
  <div>
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
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Enter your password!' }]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  </div>
);

export default LoginForm;
