import React from 'react';
import { render } from 'react-dom';
import 'typeface-roboto';
import App from './App';
import './App.css';
import configureStore from './store/configureStore';

const store = configureStore();

render(<App store={store} />, document.getElementById('app'));

moduleHotAccept(module);

export function moduleHotAccept(mod) {
  if (mod.hot) {
    mod.hot.accept('./App', () => {
      const NewApp = require('./App').default;
      render(<NewApp />, document.getElementById('app'));
    });
  }
}
