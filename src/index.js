// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

import store from './redux/store';

// ----------------------------------------------------------------------


// const config = {
//   apiKey: "AIzaSyBS8ZbiyC2xloh_FTIOPkYbxfGwrQztPdg00",
//   authDomain: "inspire-learning-9112e.firebaseapp.com",
//   projectId: "inspire-learning-9112e",
//   storageBucket: "inspire-learning-9112e.appspot.com",
//   messagingSenderId: "593350271833",
//   appId: "1:593350271833:web:3404acfcfd09637fd9a248",
//   measurementId: "G-LVG49WZNPG"
// }

// firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
       <App /*firebase={firebase} *//>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
