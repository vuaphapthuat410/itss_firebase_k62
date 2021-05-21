import firebase from 'firebase';

if (!firebase.apps.length) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBz3mVL_ORNqKpLDk_eDmUtiTYItpYHA_Q",
      authDomain: "fir-sample-2263c.firebaseapp.com",
      projectId: "fir-sample-2263c",
      storageBucket: "fir-sample-2263c.appspot.com",
      messagingSenderId: "913703448881",
      appId: "1:913703448881:web:efeecfac94f3811e038010"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
