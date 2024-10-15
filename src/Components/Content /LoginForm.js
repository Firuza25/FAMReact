import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, error }) => (
  <div>
    <h2>Вход</h2>
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}  
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Form.Item>
        <Button type="primary" htmlType="submit">Войти</Button>
      </Form.Item>
    </Form>
  </div>
);

export default LoginForm;
