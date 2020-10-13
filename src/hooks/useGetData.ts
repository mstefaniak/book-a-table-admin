import { useCallback, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { startOfToday, endOfToday, getTime } from 'date-fns';
import { Bookings, DATA_TYPE } from '../types';

export const useGetData = (type: DATA_TYPE) => {
  const { firebase } = useContext(FirebaseContext);

  const getData = useCallback(async () => {
    if (!firebase) {
      return;
    }
    const collectionRef = firebase
      .firestore()
      .collection('bookings');

    let snapshotRef = null;
    const todayStartTime = getTime(startOfToday());
    const todayEndTime = getTime(endOfToday());
    if (type === DATA_TYPE.CURRENT) {
      snapshotRef = collectionRef.where('date', '>', todayStartTime).where('date', '<', todayEndTime);
    } else if (type === DATA_TYPE.NEXT) {
      snapshotRef = collectionRef.where('date', '>=', todayEndTime);
    } else {
      snapshotRef = collectionRef.where('date', '<=', todayStartTime);
    }

    const snapshot = await snapshotRef.get();

    if (snapshot.empty) {
      console.warn('No matching documents');
      return;
    }

    const allContent = snapshot.docs.map((contentObj) => ({
      ...contentObj.data(),
      id: contentObj.id,
    }));

    return allContent as Bookings;
  }, [firebase, type]);

  return { getData };
};
