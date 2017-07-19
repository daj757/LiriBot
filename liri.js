var tkeys = require('./keys.js');
var client = tkeys.twitterKeys;
var nodeArgs1 = process.argv[2];
var commandArray = [];
for(i = 3; i < process.argv.length; i++){
	commandArray.push(process.argv[i]);

}
var command2 = commandArray.join(" ");
var command1 = String(nodeArgs1);
var twitter = require('twitter');
var spotify = require('node-spotify-api');
console.log(command1 + " " + command2);

switch(command1){
	case "my-tweets":
	myTweets();
	break;
	case "spotify-this-song":
	musicSearch(command2);
	break;


}

function myTweets(){

var twitterKeys = tkeys.twitterKeys;
var client = new twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

var params = {screen_name: "daj757", count:20};

client.get("statuses/user_timeline", params, function(error, tweets, response) {
  if (error) {
    console.log(error);
  }

  for(var i = 0; i < tweets.length; i++){

    console.log(tweets[i].text);

  }

});
}
function musicSearch(song){
	if(song === ""){
		song = "The Sign";
	}
	
	
	var spotifyClient = tkeys.spotify;
	var musicKeys =  new spotify({
		id: spotifyClient.id,
		secret: spotifyClient.secret, 
	});
	musicKeys.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 		var song = data.tracks.items[0].name;
		console.log("You have searched for the song " + song)

		var artist = data.tracks.items[0].album.artists[0].name;
	    console.log("The Artist of this song is " + artist);

	    var preview = data.tracks.items[0].album.artists[0].external_urls.spotify;
		console.log("Here is a preview link of this song " + preview)

		var album = data.tracks.items[0].album.name
		console.log("The album of this song is " + album)

});
};



