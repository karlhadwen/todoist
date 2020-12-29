import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  databaseURL: "your_databse_url",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
 

  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore()
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default database;  
