import { useEffect, useCallback, useContext, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { startOfToday, endOfToday, getTime } from 'date-fns';
import { Bookings, DATA_TYPE } from '../types';

type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

export const useBookings = (type: DATA_TYPE) => {
  const { firebase } = useContext(FirebaseContext);
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState<Bookings>([]);

  const handleSnapshot = (snapshot: Snapshot) => {
    setLoading(false);

    if (snapshot.empty) {
      console.warn('No matching documents');
      return;
    }

    const newData = snapshot.docs.map((contentObj) => ({
      ...contentObj.data(),
      id: contentObj.id,
    }));

    setData(newData as Bookings);
  }

  const init = useCallback(async () => {
    if (!firebase) {
      return;
    }
    const collectionRef = firebase
      .firestore()
      .collection('bookings');

    let query = null;
    const todayStartTime = getTime(startOfToday());
    const todayEndTime = getTime(endOfToday());
    if (type === DATA_TYPE.CURRENT) {
      query = collectionRef.where('date', '>', todayStartTime).where('date', '<', todayEndTime).orderBy('date', 'asc');
    } else if (type === DATA_TYPE.NEXT) {
      query = collectionRef.where('date', '>=', todayEndTime).orderBy('date', 'asc');
    } else {
      query = collectionRef.where('date', '<=', todayStartTime).orderBy('date', 'desc');
    }

    query.onSnapshot(snapshot => {
      handleSnapshot(snapshot);
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    const snapshot = await query.get();

    handleSnapshot(snapshot);
  }, [firebase, type]);

  useEffect(() => {
    init();
  }, [init]);

  return { bookings: data, loading };
};
