import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBWrpGJ0OeUzFeDI4X285nLBl96aGSzn9g",
    authDomain: "fir-app-7246f.firebaseapp.com",
    databaseURL: "https://fir-app-7246f-default-rtdb.firebaseio.com",
    projectId: "fir-app-7246f",
    storageBucket: "fir-app-7246f.appspot.com",
    messagingSenderId: "978350507675",
    appId: "1:978350507675:web:7ad8b1ddcb2679f7fb283e"
  };
  
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

