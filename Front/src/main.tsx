import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/index.scss';
import App from './components/App';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>
);