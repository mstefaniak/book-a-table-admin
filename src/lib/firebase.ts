import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const isDev = process.env.NODE_ENV === "development";
const projectId = isDev
  ? "book-a-table-96a18"
  : process.env.REACT_APP_FIREBASE_PROJECT_ID;
const apiKey = isDev
  ? "AIzaSyBCooZY6_EXqK5bDrW-toY0IGJ_xM7B8bE"
  : process.env.REACT_APP_FIREBASE_API_KEY;

const config = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "173934858452",
  appId: "1:173934858452:web:50fdcc7645b3d229572b41",
};

const firebase = Firebase.initializeApp(config);

export { firebase };
