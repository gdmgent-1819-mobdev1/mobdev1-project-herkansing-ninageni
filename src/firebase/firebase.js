const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: "AIzaSyDcbXl1sHqW4Pde8LYU3cQFllZZghGtFzg",
  authDomain: "mykot-ca472.firebaseapp.com",
  databaseURL: "https://mykot-ca472.firebaseio.com",
  projectId: "mykot-ca472",
  storageBucket: "mykot-ca472.appspot.com",
  messagingSenderId: "1061691079325",
};

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};
