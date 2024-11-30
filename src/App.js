import React, { useState, useCallback, useEffect, useMemo, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header';
// import Content from './Components/Content/HomeContent';
// import LoginForm from './Components/Content/LoginForm';
// import Account from './Components/Account/Account';
// import Cinema from './Components/Header/NavComponents/Cinema';
// import Theaters from './Components/Header/NavComponents/Theaters';
// import Sports from './Components/Header/NavComponents/Sports';
// import DetailsPage from './Components/Content/DetailsPage';
// import { Modal } from 'antd';

import SearchingCities from './Components/Header/SearchingBar/searchingCities';

import './App.css';
import FooterPart from './Components/Footer/FooterPart';
import axios from "axios";

export const  context = createContext({})

function App() { 
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [credentials, setCredentials] = useState([])

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  useEffect(()=> {
    axios.get('http://localhost:3031/users')
    .then(res => {
      console.log("Users: ", res.data)
      setCredentials(res.data)
      console.log("Credentials in context:", credentials);
    })
    .catch(err => {
      console.log(err)
    })

  }, [])
  useEffect(()=> {
    console.log("Credentials after updates: ", credentials)
  }, [credentials])



  

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
  }, [])

  const contextValues = useMemo(() => (
    {
      isLoggedIn,
      setIsLoggedIn,
      username,
      setUsername,
      password,
      setPassword,
      error,
      setError,
      handleLogout,
      credentials,
      setCredentials
    }

  ), [ isLoggedIn,
    username,
    password,
    error,
    credentials
   ])
   useEffect(()=>{
    console.log(contextValues);
    console.log("isLoggedin: " , isLoggedIn);

   }, [])
   console.log("context: " , contextValues);
   console.log("isLoggedin: " , isLoggedIn);
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      {/* <Router> */}
    <div className="App">
      <context.Provider value={contextValues}>
      <Header 
        // isLoggedIn={isLoggedIn} 
        // showLoginModal={showModal} 
        setSearchResults={setSearchResults}
      />
      <SearchingCities setSearchResults={setSearchResults} /> 
      <Outlet />
      </context.Provider>
      
      {/* <SearchingResults searchResults={searchResults} />  */}
      
      {/* <Modal
        title="Login"
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
      </Modal> */}



      {/* <Routes>
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/home" element={<Content />} /> 
        <Route path="/" element={<Content />} />

         
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
      </Routes> */}
    </div>
  {/* </Router> */}

  <FooterPart />
  </div>
);
}

export default App;
