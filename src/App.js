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
  const [cinemaData, setCinemaData] = useState([])
  const [theaterData, setTheaterData] = useState([])
  const [events, setEvents] = useState([])

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
    axios.get('http://localhost:3031/theater')
    .then(res => {
      setTheaterData(res.data)
      console.log("Theaters: ", theaterData)
    })
    .catch(err => {
      console.log(err)
    });
    axios.get('http://localhost:3031/cinema')
    .then(res => {
      setCinemaData(res.data)
      console.log("Theaters: ", cinemaData)
    })
    .catch(err => {
      console.log(err)
    })

  }, [])
  useEffect(()=> {
    console.log("Credentials after updates: ", credentials)
  }, [credentials])
  useEffect(() => {
    setEvents([...cinemaData, theaterData])
    console.log("All events: ", events)
  }, [cinemaData, theaterData])

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
      setCredentials,
      cinemaData,
      events
    }

  ), [ isLoggedIn,
    username,
    password,
    error,
    credentials,
    cinemaData,
    events
   ])
   useEffect(()=>{
    console.log(contextValues);
    console.log("isLoggedin: " , isLoggedIn);

   }, [])
   useEffect(() => {
    console.log("Cinema data: ", cinemaData)
   }, [cinemaData])

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
      {/* <SearchingCities setSearchResults={setSearchResults} />  */}
      <Outlet />
      </context.Provider>
      
    </div>
  {/* </Router> */}

  <FooterPart />
  </div>
);
}

export default App;
