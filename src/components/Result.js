import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
import './Result.css'
import { Box, Link, Typography } from '@material-ui/core';
//axios.defaults.baseURL = 'http://127.0.0.1:5000/'

export default function Result(props){

	let URI='http://127.0.0.1:5000/';
	let resp=null;
	//let user_input=props.location.input;
	let input_type='invalid';
	var re= new RegExp('^(?:http[s]?://)?(?:www\\.)?twitter\\.com/(\\w+)/status/(\\d+)/?$', 'i');
	console.log("received",props.location.input);
	const [response, setResponse] = useState(null);
	const [prediction, setPrediction] = useState(null);
	// const [tweet_id, setTweet_id] = useState(props.location.input?(props.location.input.match(/(\d+)\/?$/isg)):null);
	const [tweet_id, setTweet_id] = useState(props.location.input?
		!isNaN(props.location.input)?props.location.input:
		props.location.input.match(/(\d+)\/?$/isg)==null?"0":props.location.input.match(/(\d+)\/?$/isg)[0].replace(/\/+$/, "")	
	:"0");
	console.log("tweet_id",tweet_id);

useEffect(() => {
	
	let user_input=props.location.input;
	if (props.location && props.location.input === undefined) {
		props.history.push('/');
		return;
	}
	else{
		user_input=user_input.replace(/\/+$/, "");
		console.log(user_input)
		console.log(isNaN(user_input));
		if(isNaN(user_input)===false){
			input_type='id';
			setTweet_id(user_input);
		}
		else if(re.test(user_input)){
			input_type="link";
			let temp_id=user_input.match(/(\d+)\/?$/isg)[0].replace(/\/+$/, "");
			setTweet_id(temp_id);
			console.log("temp_id:",temp_id,",tweet_id:",tweet_id);

		}
		else
		{
			console.log("invalid input");
			props.history.push({pathname:"/",msg:"invalidInput"});
			console.log("error");
			return;
		}
	console.log(input_type);
	console.log("tweet id :",tweet_id);
	if(tweet_id>=20){
		axios.get(URI+"api/tweet?id="+tweet_id)
		.then(res => {
		setResponse(res.data)
		console.log(res.data.data)

		axios.get(URI+"api/predict?query="+res.data.data[0].text)
		.then(res => {
		console.log(res.data.description)
		setPrediction(res.data)	
		})
	})
	}
	else{
		props.history.push({pathname:"/",msg:"invalidInput"});
		console.log("tweet id should be greater than or equal to 20");
		return;
	}
	

	// setTimeout(() => {

	// }, 1000);

	}

}, []);

useEffect(() => {
	// Your code here
  }, [tweet_id]);




return <div className="container">
	{/* <div className="content"> */}
		<div className="headtab">
			<span className="tweetid">
				Tweet ID: <span> {tweet_id} </span>
			</span>
		<span className="prediction">{prediction?<>Prediction:  <span className={prediction?prediction.description:null}>{prediction.description}</span></>:null}</span>			
		</div>
		<TwitterTweetEmbed tweetId={tweet_id}/>
		{/* {console.log("response from local api",resp)} */}
		{/* {response?<span>this is response:  {response.data[0].text}</span>:null}  */}
		<Box mt={2}>	
			<Typography variant="body2" color="textSecondary" align="center">
            	<Link color="inherit" href="https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam" className="report">
        			Click to Report
      			</Link>{' this Tweet.'}
    		</Typography>
		</Box>
	{/* </div> */}
</div>
}