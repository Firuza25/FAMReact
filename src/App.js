import React, { useState, useCallback, useEffect, useMemo} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import credentials from './Components/DB/credentials';
import Header from './Components/Header/Header';
import Content from './Components/Content /Content';
import LoginForm from './Components/Content /LoginForm';
import Account from './Components/Account/Account';
import Cinema from './Components/Header/NavComponents/Cinema';
import Theaters from './Components/Header/NavComponents/Theaters';
import Sports from './Components/Header/NavComponents/Sports';
import DetailsPage from './Components/Content /DetailsPage';
import { Modal } from 'antd';
// import { Layout } from 'antd';
import SearchingCities from './Components/Header/SearchingBar/searchingCities';

import './App.css';
import FooterPart from './Components/Footer/FooterPart';
import SearchingResults from './Components/Content /SearchingResults';

function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [showAccount, setShowAccount] = useState(false); 
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);


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
  return (
    <div>
      <Router>
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        showLoginModal={showModal} 
        setSearchResults={setSearchResults}
      />
      <SearchingCities setSearchResults={setSearchResults} /> 
      {/* <SearchingResults searchResults={searchResults} />  */}
      
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

      <Routes>
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/home" element={<Content />} /> 
        <Route path="/" element={<Content />} />

            {/* <Route path="/home" element={<Content searchResults={memoizedSearchResults} />} /> 
          <Route path="/" element={<Content searchResults={memoizedSearchResults} />} /> */}

        <Route path="/:category/:id" element={<DetailsPage />} />

        
        {isLoggedIn ? (
          <>
            <Route path="/myAccount" element={<Account username={username} />} />
          </>
        ) : (
          <Route path="/login" element={<LoginForm 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
            error={error} />} />
        )}
      </Routes>
    </div>
  </Router>

  <FooterPart />
  </div>
    


  

);
}

export default App;
