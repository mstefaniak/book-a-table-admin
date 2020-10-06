import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NoteAdd as NoteAddIcon, Done as DoneIcon } from '@material-ui/icons';
import { format } from 'date-fns';
import { useGetData, useUpdate } from '../../hooks';
import { STATUS, STATUS_MAP, Bookings } from '../../types';

const chipColors: { [key:number]: 'default' | 'primary' | 'secondary' } = {
  [STATUS.CANCELED]: 'default',
  [STATUS.NEW]: 'default',
  [STATUS.CONFIRMED]: 'default',
  [STATUS.PREPARED]: 'secondary',
  [STATUS.FINISHED]: 'primary',
};

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  th: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
}));

const Current = (): React.ReactNode => {
  const { getData } = useGetData('current');
  const [ bookings, setBookings ] = useState<Bookings | undefined>();
  const { update } = useUpdate();
  const classes = useStyles();
  const disabled = useRef<string>('');

  const getBookings = useCallback(async () => {
    const bookings = await getData();
    setBookings(bookings);
  }, [getData]);

  const markPrepared = async (bookingId: string) => {
    disabled.current = bookingId;
    await update(bookingId, { status: STATUS.PREPARED });
    getBookings();
    disabled.current = '';
  }

  const markFinished = async (bookingId: string) => {
    disabled.current = bookingId;
    await update(bookingId, { status: STATUS.FINISHED });
    getBookings();
    disabled.current = '';
  }

  const formatDate = (seconds: number): string => {
    return format(new Date(seconds * 1000), 'HH:mm');
  }

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
           Bookings for today:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        { bookings ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.th}>Who</TableCell>
                  <TableCell className={classes.th} align="right">What time</TableCell>
                  <TableCell className={classes.th} align="right">Persons</TableCell>
                  <TableCell className={classes.th} align="right">Where</TableCell>
                  <TableCell className={classes.th} align="right">Status</TableCell>
                  <TableCell className={classes.th} align="right">Comment</TableCell>
                  <TableCell className={classes.th} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell component="th" scope="row">
                      {booking.name}
                    </TableCell>
                    <TableCell align="right">{formatDate(booking.date.seconds)}</TableCell>
                    <TableCell align="right">{booking.people}</TableCell>
                    <TableCell align="right">{booking.area}</TableCell>
                    <TableCell align="right">
                      <Chip
                        color={chipColors[booking.status]}
                        label={STATUS_MAP[booking.status]}
                      />
                    </TableCell>
                    <TableCell align="right">{booking.comment}</TableCell>
                    <TableCell align="right">
                      {booking.status < STATUS.PREPARED &&
                        <Tooltip title="Mark prepared">
                          <IconButton
                            edge="end"
                            aria-label="prepared"
                            disabled={disabled.current === booking.id}
                            onClick={() => markPrepared(booking.id)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      }
                      {booking.status < STATUS.FINISHED &&
                        <Tooltip title="Mark finished">
                          <IconButton
                            edge="end"
                            aria-label="finished"
                            disabled={disabled.current === booking.id}
                            onClick={() => markFinished(booking.id)}
                          >
                            <DoneIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>None :(</div>
        )}
      </Grid>
    </Grid>
  );
};

export { Current };
