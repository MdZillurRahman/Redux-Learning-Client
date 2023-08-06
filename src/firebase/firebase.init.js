
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

/*  I am change the code because  env file is not push git so when
we pull the code then project give us firebase auth error  */

const firebaseConfig = {
  apiKey: 'AIzaSyA69o-Cc2zZmksuaWdfLCDlZqXHQFUM_0M',
  authDomain: 'redux-learning-11b81.firebaseapp.com',
  projectId: 'redux-learning-11b81',
  storageBucket: 'redux-learning-11b81.appspot.com',
  messagingSenderId: '13590830968',
  appId: '1:13590830968:web:8c9f7f06d4fb83c6dc728d',
  measurementId: 'G-SRYT0JZZ3W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
