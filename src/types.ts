export enum STATUS {
  NEW = 0,
  CONFIRMED = 1,
  PREPARED = 2,
  REALIZED = 3,
  NOT_REALIZED = 4,
  CANCELED = 5,
}

export const STATUS_MAP = {
  0: 'New',
  1: 'Confirmed',
  2: 'Prepared',
  3: 'Realized',
  4: 'Not realized',
  5: 'Canceled',
};

interface Booking {
  id: string;
  name: string;
  email: string;
  status: STATUS;
  people: number;
  area: string;
  comment: string;
  date: number;
}

export type Bookings = Array<Booking>;

export enum DATA_TYPE {
  CURRENT = 'current',
  NEXT = 'next',
  HISTORY = 'history',
}
