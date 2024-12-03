import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import credentials from './Components/DB/credentials';
import Header from './Components/Header/Header';
import Content from './Components/Content/HomeContent';
import LoginForm from './Components/Content/LoginForm';
import Account from './Components/Account/Account';
import Cinema from './Components/Header/NavComponents/Cinema';
import Theaters from './Components/Header/NavComponents/Theaters';
import Sports from './Components/Header/NavComponents/Sports';
import DetailsPage from './Components/Content/DetailsPage';
import SignupForm from './Components/Content/SignupForm';
import JsonServer from './Components/JsonServer';
import MyProfile from './Components/Account/MyProfile';
import MyProfileSettings from './Components/Account/MyProfileSettings';
import MyTickets from './Components/Account/MyTickets';
import BuyTicketModal from './Components/Content/BuyTicketModal';
import store from './store';
import { Provider } from 'react-redux';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/serviceWorker.js');
      console.log('Service Worker registered with scope:', registration.scope);

      // Запрос разрешения на уведомления
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Уведомления разрешены пользователем.');

        // Подписываем пользователя
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BJjhfWvGIDo2YdfWRHq0CA7Hs2d4uwvnHPHTDen6qSgX7lCu2oQqj2cDZ8aCxlwKii6D3XVpEyzw6aw4jlSqKFs', 
        });

        console.log('Push Subscription:', subscription);

        // Отправьте подписку на сервер
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        });
      } else {
        console.error('Пользователь отказался от уведомлений.');
      }
    } catch (error) {
      console.error('Ошибка регистрации Service Worker или подписки:', error);
    }
  });
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,  // Set Home as the default component for /
        element: <Content />,
      },
      {
        path: "home",
        element: <Content />,
      },
      {
        path: "cinema",
        element: <Cinema />,
      },
      {
        path: "theaters",
        element: <Theaters />,
      },
      {
        path: "sports",
        element: <Sports />,
      },
      {
        path: "user-profile",
        element: <MyProfile />,
        children: [
          {
            index: true, 
            element: <MyProfileSettings />,
          },
          {
            path: "tickets",  
            element: <MyTickets />,
          },
        ]
      },
      {
        path: ":category/:id",
        element: <DetailsPage />,
      },
      {
        path: "login-page",
        element: (
          <LoginForm
          />
        ),
      },
      {
        path: "signup-page",
        element: (
          <SignupForm
          />
        ),
      },
      {
        path: "buy-tickets",  
        element: <BuyTicketModal />,
      },
    ]

  },
  {
    path: "/json-server",
    element: <JsonServer />,
  },
  {
    path: "/*",
    element: <h1>Page not found!</h1>,
  }
  
  // {
  //   path: "/myAccount",
  //   element: isLoggedIn ? (
  //     <Account />
  //   ) : (
  //     <LoginForm
  //     />
  //   ),
  // },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
);
reportWebVitals();