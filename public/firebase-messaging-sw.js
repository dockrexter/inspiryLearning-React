// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey:"AIzaSyD9_0W19n2GSX3TJXfwr-eZ0eF9vE4MMdI",
    authDomain: "inspiry-learning.firebaseapp.com",
    projectId: "inspiry-learning",
    storageBucket: "inspiry-learning.appspot.com",
    messagingSenderId: "988318202051",
    appId:"1:988318202051:web:bb3a1ad0916e5e5896ca76"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});