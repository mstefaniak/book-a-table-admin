import { createContext } from "react";
import Firebase from "firebase/app";

type FirebaseContextType = {
  firebase: Firebase.app.App | null;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  firebase: null,
});
