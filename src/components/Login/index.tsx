import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, CardActions, TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FirebaseContext } from "../../context/firebase";

const useStyles = makeStyles((theme: Theme) => ({
  error: {
    padding: theme.spacing(1),
    color: theme.palette.error.main,
    textAlign: 'center',
  },
  content: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  card: {
    maxWidth: 400,
    margin: '40px auto',
  },
  actions: {
    justifyContent: 'center',
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [ error, setError ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onLogin();
    }
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(event?.target?.value);
  }

  const onLogin = () => {
    if (!firebase) {
      return;
    }

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {error && <p className={classes.error}>Incorrect email and/or password</p>}
        <TextField label="E-mail" autoFocus value={email} onChange={onEmailChange} fullWidth onKeyPress={handleKeyPress} />
        <TextField label="Password" type="password" value={password} onChange={onPasswordChange} fullWidth onKeyPress={handleKeyPress} />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" onClick={onLogin}>
          Log in
        </Button>
      </CardActions>
    </Card>
  )
}
