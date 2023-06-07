import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { store } from './store.ts';

import Home from './components/Home/index.tsx';

import './styles/index.scss';

/*-- Test --*/


/*-- Routers --*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

/*-- Render --*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
