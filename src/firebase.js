import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

var firebaseConfig = {
    apiKey: "AIzaSyALYozyuuAViZV_o2WEQOL13x4lKBexqBY",
    authDomain: "inspiry-learning-fcm.firebaseapp.com",
    projectId: "inspiry-learning-fcm",
    storageBucket: "inspiry-learning-fcm.appspot.com",
    messagingSenderId: "559676178215",
    appId: "1:559676178215:web:f4091cacface0c2671f302"
  };


export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);

export const fetchToken = async(setTokenFound) => {
  return await getToken(messaging, {vapidKey: 'BC61EFfyLfPoF8RFu_9AyYXmuENK-HpHcagRPMGsiljTbHnjjIaB4hNGxd_Y3eXF5MX83mV70hBdw-L1t9aQUW4'}).then((currentToken) => {
    if (currentToken) {
      //console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      //console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    //console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});