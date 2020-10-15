import React, { useEffect, useState, useContext } from 'react';
import { BookingsList } from './components/BookingsList';
import { Login } from './components/Login';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { DATA_TYPE } from './types';
import { FirebaseContext } from "./context/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    flexGrow: 1,
    backgroundColor: theme.palette.grey[100],
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
};

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);

    if (firebase && newValue === 3) {
      firebase.auth().signOut();
    }
  };

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setValue(0);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }

        setLoading(false);
      });
    }
  }, [firebase]);

  if (loading) {
    return null;
  }

  if (!isLogged) {
    return <div className={classes.root}><Login /></div>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Current" />
          <Tab label="Upcoming" />
          <Tab label="History" />
          <Tab label="Sign out" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BookingsList type={DATA_TYPE.CURRENT} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookingsList type={DATA_TYPE.NEXT} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BookingsList type={DATA_TYPE.HISTORY} />
      </TabPanel>
    </div>
  );
}

export default App;
