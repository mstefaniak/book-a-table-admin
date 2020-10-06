enum Status {
  NEW = 0,
  CONFIRMED = 1,
  DONE = 2,
  CANCELED = 3,
}

const STATUS_MAP = {
  0: 'New',
  1: 'Confirmed',
  2: 'Done',
  3: 'Canceled',
};


interface Booking {
  id: string;
  name: string;
  email: string;
  status: number;
  people: number;
  area: string;
  comment: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}
export type Bookings = Array<Booking>;

export { Status, STATUS_MAP };
