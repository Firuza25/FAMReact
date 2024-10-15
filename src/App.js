import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import credentials from './Components/DB/credentials';
import Header from './Components/Header/Header';
import Content from './Components/Content /Content';
import LoginForm from './Components/Content /LoginForm';
import Account from './Components/Account/Account';
import Cinema from './Components/Header/NavComponents/Cinema';
import Theaters from './Components/Header/NavComponents/Theaters';
import Sports from './Components/Header/NavComponents/Sports';
import { Modal } from 'antd';
import './App.css';

function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [showAccount, setShowAccount] = useState(false); 

  const handleLogin = useCallback(() => {
    const foundUser = credentials.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setIsLoggedIn(true);
      setError('');
      setIsModalVisible(false); 
    } else {
      setError('Неверные данные для входа. Попробуйте снова.');
    }
  }, [username, password]);
  
  // const logOut = useCallback(() => {
  //   setIsLoggedIn(false);
  //   setUsername('');
  //   setPassword('');
  //   setError('');
  //   setShowAccount(false); 
  // }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openAccount = () => {
    setShowAccount(true);
  };

  const closeAccount = () => {
    setShowAccount(false); 
  };

  return (
    <Router>
      <div className="App">
        <Header 
          isLoggedIn={isLoggedIn} 
          showLoginModal={showModal} 
          openAccount={openAccount} 
        />
        <Modal
          title="Вход"
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
          />
        </Modal>

        {showAccount ? (
          <Account username={username} closeAccount={closeAccount} />
        ) : (
          <Routes>
            <Route path="/cinema" element={<Cinema />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/home" element={<Content />} /> 
            <Route path="/" element={<Content />} /> 
            <Route path="/myAccount" element={<Account/>} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
