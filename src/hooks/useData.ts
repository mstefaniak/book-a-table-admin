import { useCallback, useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { startOfToday, endOfToday } from 'date-fns';
import { Bookings } from '../types';

type WhereType = [string, firebase.firestore.WhereFilterOp, any];

const useData = (target: string, where?: WhereType) => {
  const [data, setData] = useState<Bookings>();
  const { firebase } = useContext(FirebaseContext);

  const queryData = useCallback(async () => {
    if (!firebase) {
      return;
    }
    const collectionRef = firebase
      .firestore()
      .collection(target);
    const snapshot = where
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

    setData(allContent as Bookings);
  }, [firebase, target, where]);

  useEffect(() => {
    queryData();
  }, []);

  return { [target]: data };
};

export { useData };
