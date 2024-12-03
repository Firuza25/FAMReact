import { configureStore, createSlice } from '@reduxjs/toolkit';

// Dat Slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    isLoggedIn: false,
    username: '',
    password: '',
    activeUser: {},
    isAuthorized: false,
    isValid: true,
    error: '',
    credentials: [],
    cinemaData: [],
    theaterData: [],
    events: {},
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.activeUser = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      state.password = '';
      state.activeUser = {};
    },
    setLogin(state, action) {
        state.isLoggedIn = action.payload;
    },
     
    setError(state, action) {
      state.error = action.payload;
    },
    authorize(state, action) {
      state.isAuthorized = action.payload;
    },
    validate(state, action) {
      state.isValid = action.payload;
    },
    setCredentials(state, action) {
        state.credentials = action.payload;
    },
    setCinemaData(state, action) {
        state.cinemaData = action.payload;
        state.events.cinema = action.payload;
      },
    setTheaterData(state, action) {
        state.theaterData = action.payload;
        state.events.theater = action.payload;
      },
    setActiveUser(state, action) {
        state.activeUser = action.payload; 
      },
  },
});



export const { login, setLogin, logout, setError, authorize, validate, setCredentials, setCinemaData, setTheaterData, setActiveUser, } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
