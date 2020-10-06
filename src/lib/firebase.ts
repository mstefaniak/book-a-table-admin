import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBCooZY6_EXqK5bDrW-toY0IGJ_xM7B8bE",
  authDomain: "book-a-table-96a18.firebaseapp.com",
  databaseURL: "https://book-a-table-96a18.firebaseio.com",
  projectId: "book-a-table-96a18",
  storageBucket: "book-a-table-96a18.appspot.com",
  messagingSenderId: "173934858452",
  appId: "1:173934858452:web:50fdcc7645b3d229572b41",
};

const firebase = Firebase.initializeApp(config);

export { firebase };
