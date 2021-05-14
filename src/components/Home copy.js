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

export default function Home() {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const endpointURL = "https://api.twitter.com/2/tweets?ids=";
  const needle = require('needle');
  const token = "";

  async function getRequest() {

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        "ids": "1278747501642657792,1255542774432063488", // Edit Tweet IDs to look up
        // "tweet.fields": "lang,author_id", // Edit optional query parameters here
        // "user.fields": "created_at" // Edit optional query parameters here
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        // process.exit(-1);
    }
    // process.exit();
})();

  function submitClick(e) {
    e.preventDefault();
    console.log(title);
    getRequest();
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
            Twitter Misogyny Detector App
          </Typography>
          <form className={classes.form} onSubmit={submitClick}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Tweet ID"
              name="tweetid"
              autoComplete="text"
              autoFocus
              required
              onChange={event => setTitle(event.target.value)}
            />
            {title}
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
              type=""
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
        </div>
      </Grid>
    </Grid>
  );
}