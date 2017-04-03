import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'; 
import App from './App';
import './index.css';

//inicializar firebase
firebase.initializeApp({
    apiKey: "AIzaSyBXGUPWynOjS73Mpvp25YynTm1tQcYb_vs",
    authDomain: "pseudogram-react.firebaseapp.com",
    databaseURL: "https://pseudogram-react.firebaseio.com",
    projectId: "pseudogram-react",
    storageBucket: "pseudogram-react.appspot.com",
    messagingSenderId: "818035142217"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);