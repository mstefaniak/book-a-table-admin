import React, { useState } from 'react';
import { Current } from './components/Current';
import { Next } from './components/Next';
import { History } from './components/History';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';

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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
          <Tab label="Next" />
          <Tab label="History" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Current />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Next />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History />
      </TabPanel>
    </div>
  );
}

export default App;
