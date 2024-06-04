import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';   //another js file (we import a component 'App' from a different js file into this file)
import './styles.css'; //importing css file

import { ContextProvider } from './SocketContext';  //importing contextProvider 

ReactDOM.render(                             // its only work on react 17 
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root'),
);