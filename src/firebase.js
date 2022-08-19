import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyD9_0W19n2GSX3TJXfwr-eZ0eF9vE4MMdI",
    authDomain: "inspiry-learning.firebaseapp.com",
    projectId: "inspiry-learning",
    storageBucket: "inspiry-learning.appspot.com",
    messagingSenderId: "988318202051",
    appId: "1:988318202051:web:bb3a1ad0916e5e5896ca76"
  };


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BCaXFN8VlQgG3_vQMb0aaJzYVkJoivRpd10AhP-BgFKVM8eykVsJ8fp3mbxauVMb7_y5SMAW3LVCa-7INruesaM'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});