import { useCallback, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

const useUpdate = () => {
  const { firebase } = useContext(FirebaseContext);

  const update = useCallback(async (docId: string, data: { [key:string]: string | number }) => {
    if (!firebase) {
      return;
    }
    const collectionRef = firebase
      .firestore()
      .collection('bookings');

    return collectionRef.doc(docId).update(data);
  }, [firebase]);

  return { update };
};

export { useUpdate };
