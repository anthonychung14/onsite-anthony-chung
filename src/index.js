import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'molekule';
import App from './app';

import 'normalize.css';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  rootEl,
);
