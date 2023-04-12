import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import HistoryRouter from './components/history-router/history-router';
import { browserHistory } from './utils/browser-history';
import { HelmetProvider } from 'react-helmet-async';
import { apiSlice } from './api/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(apiSlice.endpoints.checkAuth.initiate());

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <HelmetProvider>
          < App/>
        </HelmetProvider>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);
