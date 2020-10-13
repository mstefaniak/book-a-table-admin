import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  NoteAdd as NoteAddIcon,
  Done as DoneIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import { format } from 'date-fns';
import { useGetData, useUpdate } from '../../hooks';
import { STATUS, STATUS_MAP, Bookings } from '../../types';

const chipColors: { [key:number]: 'default' | 'primary' | 'secondary' } = {
  [STATUS.CANCELED]: 'default',
  [STATUS.NEW]: 'default',
  [STATUS.CONFIRMED]: 'default',
  [STATUS.PREPARED]: 'secondary',
  [STATUS.REALIZED]: 'primary',
  [STATUS.NOT_REALIZED]: 'default',
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

const Current = (): JSX.Element => {
  const { getData } = useGetData('current');
  const [ bookings, setBookings ] = useState<Bookings | undefined>();
  const { update } = useUpdate();
  const classes = useStyles();
  const disabled = useRef<string>('');

  const getBookings = useCallback(async () => {
    const bookings = await getData();
    setBookings(bookings);
  }, [getData]);

  const changeStatus = async (bookingId: string, status: STATUS) => {
    disabled.current = bookingId;
    await update(bookingId, { status });
    getBookings();
    disabled.current = '';
  }

  const formatTime = (timestamp: number): string => {
    return format(new Date(timestamp), 'HH:mm');
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
                  <TableCell className={classes.th} align="center">What time</TableCell>
                  <TableCell className={classes.th} align="center">Persons</TableCell>
                  <TableCell className={classes.th} align="center">Where</TableCell>
                  <TableCell className={classes.th} align="center">Status</TableCell>
                  <TableCell className={classes.th} align="center">Comment</TableCell>
                  <TableCell className={classes.th}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell component="th" scope="row">
                      {booking.name}
                    </TableCell>
                    <TableCell align="center">{formatTime(booking.date)}</TableCell>
                    <TableCell align="center">{booking.people}</TableCell>
                    <TableCell align="center">{booking.area}</TableCell>
                    <TableCell align="center">
                      <Chip
                        color={chipColors[booking.status]}
                        label={STATUS_MAP[booking.status]}
                      />
                    </TableCell>
                    <TableCell align="center">{booking.comment}</TableCell>
                    <TableCell align="right">
                      {booking.status < STATUS.PREPARED &&
                        <Tooltip title="Mark prepared">
                          <IconButton
                            edge="end"
                            aria-label="prepared"
                            disabled={disabled.current === booking.id}
                            onClick={() => changeStatus(booking.id, STATUS.PREPARED)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      }
                      {booking.status === STATUS.PREPARED &&
                        <>
                          <Tooltip title="Mark not realized">
                            <IconButton
                              edge="end"
                              aria-label="not realized"
                              disabled={disabled.current === booking.id}
                              onClick={() => changeStatus(booking.id, STATUS.NOT_REALIZED)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Mark realized">
                            <IconButton
                              edge="end"
                              aria-label="realized"
                              disabled={disabled.current === booking.id}
                              onClick={() => changeStatus(booking.id, STATUS.REALIZED)}
                            >
                              <DoneIcon />
                            </IconButton>
                          </Tooltip>
                        </>
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
