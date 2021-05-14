import React,{useState,useEffect} from 'react';
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
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

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
  const qs = require('querystring');
  const request = require('request');
 
//   const readline = require('linebyline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
const util = require('util');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const requestTokenURL = new URL('https://api.twitter.com/oauth/request_token');
const accessTokenURL = new URL('https://api.twitter.com/oauth/access_token');
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const endpointURL = new URL('https://api.twitter.com/labs/2/tweets');

const params = {
  ids: '1138505981460193280',
  'tweet.fields': 'created_at',
};

// async function input(prompt) {
//   return new Promise(async (resolve, reject) => {
//     readline.question(prompt, (out) => {
//       readline.close();
//       resolve(out);
//     });
//   });
// }

async function requestToken() {
  const oAuthConfig = {
    callback: 'oob',
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
  };

  const req = await post({url: requestTokenURL, oauth: oAuthConfig});
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function accessToken({oauth_token, oauth_token_secret}, verifier) {
  const oAuthConfig = {
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: oauth_token,
    token_secret: oauth_token_secret,
    verifier: verifier,
  }; 
  
  const req = await post({url: accessTokenURL, oauth: oAuthConfig});
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}



async function getRequest({oauth_token, oauth_token_secret}) {
  const oAuthConfig = {
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: oauth_token,
    token_secret: oauth_token_secret,
  };

  const req = await get({url: endpointURL, oauth: oAuthConfig, qs: params, json: true});
  if (req.body) {
    return req.body;
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

(async () => {
  try {

    // Get request token
    const oAuthRequestToken = await requestToken();
    
    // Get authorization
    authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
    console.log('Please go here and authorize:', authorizeURL.href);
    // const pin = await input('Paste the PIN here: ');
    const pin="";
    // Get the access token
    const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());

    // Make the request
    const response = await getRequest(oAuthAccessToken);
    console.log(response);
  } catch(e) {
    console.error(e);
    // process.exit(-1);
  }
//   process.exit();
})();

  function submitClick(e) {
    e.preventDefault();
    console.log(title);
    // getRequest();
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
          {/* 933354946111705097 */}
          {title}
      {/* <TwitterTweetEmbed tweetId={title}/> */}
        </div>
      </Grid>
    </Grid>
    
  );
}