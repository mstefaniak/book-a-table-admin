import { getTime, endOfToday } from 'date-fns';


export const reload = () => {
  const secondsToMidnight = getTime(endOfToday()) - getTime(new Date());

  setTimeout(() => {
    window.location.reload();
  }, secondsToMidnight + 10);
}
