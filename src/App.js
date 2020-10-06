import React from 'react';
import { Current } from './components/Current';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    flexGrow: 1,
    padding: 40,
    backgroundColor: theme.palette.grey[100],
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Current />
    </div>
  );
}

export default App;
