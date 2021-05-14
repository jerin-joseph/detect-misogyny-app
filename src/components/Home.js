import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        RSOC Labs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    height:'100%',
    margin:'0',
    padding:'100px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width:'60px',
    height:'60px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [input, setInput] = useState('')
  let invalidInput=false;
  // const [error, setError] = useState(false)
  if (props.location && props.location.msg === 'invalidInput') {
    // setError(true);
    invalidInput=true;
    console.log("returned due to error");
    }

  function submitClick(e) {
    e.preventDefault();
    console.log(input);
    // getRequest();
    props.history.push({pathname:"/result",input:input})
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FindInPageIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Online Misogyny Detection App
          </Typography>
          <form className={classes.form} onSubmit={submitClick} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Tweet ID / Tweet Link"
              name="tweetid"
              autoComplete="text"
              autoFocus
              required
              {...(invalidInput ? {'error':true}:{})}
              {...(invalidInput ? {'helperText':'Please Enter a Valid Input'}:{})}
              onChange={event => setInput(event.target.value)}
            />
            {input}
             {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />  */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}

            <Box mt={2}>
              <Copyright />
            </Box>
          </form>
              {/* {title} */}
        </div>
      </Grid>
    </Grid>
  );
}