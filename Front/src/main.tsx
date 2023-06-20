import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter as Router} from 'react-router-dom';

import './styles/index.scss';
import App from './components/App';


/*-- Render --*/

/*-- Méthode 6.4 mais qui ne fonctionne pour pour la redirection --
___________________________________________________________________________
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>
);
