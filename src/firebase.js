import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyDYaEgOn2ivsfMBH2f9AM9TljMvBYn5NHs',
  authDomain: 'todoist-speed-coding.firebaseapp.com',
  databaseURL: 'https://todoist-speed-coding.firebaseio.com',
  projectId: 'todoist-speed-coding',
  storageBucket: 'todoist-speed-coding.appspot.com',
  messagingSenderId: '1094708773409',
  appId: '1:1094708773409:web:40e424440b3e40e4',
});

export { firebaseConfig as firebase };
