import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import FooterPart from './Components/Footer/FooterPart';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setCinemaData, setTheaterData } from './store';
import axios from 'axios';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cinemaData, theaterData, credentials } = useSelector((state) => state.data);

  // Memoize the search results to avoid unnecessary re-renders
  const memoizedSearchResults = useMemo(() => credentials, [credentials]);

  // Fetching data from the API on initial load
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3031/users'),
      axios.get('http://localhost:3031/theaters'),
      axios.get('http://localhost:3031/cinema')
    ])
      .then(([usersRes, theaterRes, cinemaRes]) => {
        dispatch(setCredentials(usersRes.data));
        dispatch(setTheaterData(theaterRes.data));
        dispatch(setCinemaData(cinemaRes.data));
        console.log('Fetched data: ', { usersRes, theaterRes, cinemaRes });
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
      });
  }, [dispatch]);

  // Logs credentials and data when they change
  useEffect(() => {
    console.log('Credentials after updates: ', credentials);
  }, [credentials]);

  useEffect(() => {
    console.log('Cinema data: ', cinemaData);
  }, [cinemaData]);

  useEffect(() => {
    console.log('Theater data: ', theaterData);
  }, [theaterData]);

  return (
    <div className="App">
      <Header setSearchResults={() => {}} /> {/* Handle search result setter logic */}
      <Outlet />
      <FooterPart />
    </div>
  );
}

export default App;
