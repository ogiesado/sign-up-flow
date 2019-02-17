import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import App from './App';

const store = createStore(reducer);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  rootElement
);
