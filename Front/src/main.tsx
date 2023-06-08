import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { store } from './store.ts';

import './styles/index.scss';
import App from './components/App';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';


/*-- Routers --*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

/*-- Render --*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
