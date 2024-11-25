import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import articlesReducer from './features/articlesSlice';
import userReducer from './features/userSlice';
import App from './components/App';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
