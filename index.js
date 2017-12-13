const config = require('./config');
const twit = require('twit');
const T = new twit(config);
const twts = require('./data/tweets.js');
const tweets = twts.tweets;

const spence = '880634071419846657';
const burgers = '15751083';
const duckboi = '865898987836014592';
const henry = '925160703006330880';

//streams for burgers and replies
console.log("listening...")
var stream = T.stream('statuses/filter', {follow: burgers});
stream.on('tweet', function(tweet, err){
  console.log("we found a tweet...");
  console.log(tweet);
  var statusObj = {status: "@" + tweet.user.screen_name + " tired of this guy? lets replace him with @willfisher4cong",
                in_reply_to_status_id: tweet.id_str
}
  T.post('statuses/update', statusObj, function(err,tweetReply, resp){
    if(err){
      console.log("error in posting", err)
    }
    console.log("it worked!!");
    console.log(tweetReply.text);
  });
});

//streams for someone and retweets
var stream2 = T.stream('statuses/filter', {follow: duckboi});
 stream2.on('tweet', function(tweet, err){
   var retweet = tweet.id_str;
   T.post('statuses/retweet/:id', { id: retweet }, function (err, data, response) {
     console.log(data)
   });
 });


 //streams for mentions of someone
 var stream3 = T.stream('statuses/filter', {track: "rep michael burgess"})
  stream.on('tweet', function(tweet){
    console.log("we found a tweet...");
    var statusObj = {status: "sup @" + tweet.user.screen_name + "? wanna replace burgess? follow @willfisher4cong",
                    in_reply_to_status_id: tweet.id_str
    }
    T.post('statuses/update', statusObj, function(err,tweetReply, resp){
      if(err){
        console.log("error in posting", err)
      }
      console.log("it worked!!");
      console.log(tweetReply.text);
    });
  });







 // function gets users tweets and will store them as an array of objects

 // T.get('statuses/user_timeline', {screen_name: 'spencepeacock1', language: 'en', include_rts: false, exclude_replies: true, count: 2 } , gotData);
 //  function gotData(err, data, response) {
 //    for(var i = 0; i < data.length; i++){
 //
 //      var statusObj = {status: "@" + data[i].user.screen_name + " @willfisher4cong is running to replace michael burgess join us!",
 //                 in_reply_to_status_id: data[i].id_str
 //       }
 //       if(data[i].created_at < 10)
 //       console.log("tweet" + (i+1));
 //       console.log("Text:  " + data[i].text);
 //       console.log("User:   " + data[i].user.name);
 //       console.log("Time:" + data[i].created_at);
 //       console.log("tweet id: " + data[i].id);
 //       var date = new Date();
 //       var day = date.getDay();
 //   }
 // }
