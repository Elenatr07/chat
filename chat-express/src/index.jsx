import React, { createContext } from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDLEemdOpfycese9ZZJ8azCo4zTj6i8k0",
  authDomain: "chat-express-d3d7f.firebaseapp.com",
  projectId: "chat-express-d3d7f",
  storageBucket: "chat-express-d3d7f.appspot.com",
  messagingSenderId: "264503715783",
  appId: "1:264503715783:web:9f2c7bec41838414e71be2",
  measurementId: "G-QDXV3BC0T5"
};

export const Context = createContext(null);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

ReactDOM.render(
  <Context.Provider value={{
    app,
    auth,
    firestore
  }

  }>
    <App />
  </Context.Provider>,
  document.getElementById('root')

);