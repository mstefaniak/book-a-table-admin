enum STATUS {
  CANCELED = 0,
  NEW = 1,
  CONFIRMED = 2,
  PREPARED = 3,
  FINISHED = 4,
}

const STATUS_MAP = {
  0: 'Canceled',
  1: 'New',
  2: 'Confirmed',
  3: 'Prepared',
  4: 'Finished',
};


interface Booking {
  id: string;
  name: string;
  email: string;
  status: STATUS;
  people: number;
  area: string;
  comment: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}
export type Bookings = Array<Booking>;

export { STATUS, STATUS_MAP };
