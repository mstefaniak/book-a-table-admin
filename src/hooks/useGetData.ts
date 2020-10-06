import { useCallback, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { startOfToday, endOfToday } from 'date-fns';
import { Bookings } from '../types';

const useGetData = (which?: string) => {
  const { firebase } = useContext(FirebaseContext);

  const getData = useCallback(async () => {
    if (!firebase) {
      return;
    }
    const collectionRef = firebase
      .firestore()
      .collection('bookings');

    const snapshot = which === 'current'
      ? await collectionRef.where('date', '>', startOfToday()).where('date', '<', endOfToday()).get()
      : await collectionRef.get();

    if (snapshot.empty) {
      console.warn('No matching documents');
      return;
    }

    const allContent = snapshot.docs.map((contentObj) => ({
      ...contentObj.data(),
      id: contentObj.id,
    }));

    return allContent as Bookings;
  }, [firebase, which]);

  return { getData };
};

export { useGetData };
