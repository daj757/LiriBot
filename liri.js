var logCount = 0;
var tkeys = require('./keys.js');
var request = require('request');
var fs = require("fs");
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


switch(command1){
	case "my-tweets":
	myTweets();
	log(command1, command2);
	break;
	case "spotify-this-song":
	musicSearch(command2.trim());
	log(command1, command2);
	break;
	case "movie-this":
	movieSearch(command2);
	log(command1, command2);
	break;
	case "do-what-it-says":
	doIt();
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

function movieSearch(movie){
	if(movie === ""){
		movie = "Mr.Nobody"
		console.log("You have not entered a specific movie... Check out " + movie)
	}
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	
	request(queryURL, function(error, response, body) {

    if (!error && response.statusCode === 200) {
  	console.log("You movie you have searched for is: " + JSON.parse(body).Title);
    
	console.log("The movie's release year is: " + JSON.parse(body).Year);
    
    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);

	console.log("The movie's rotten tomatoes rating is: " + JSON.parse(body).tomatoUserRating);

	console.log("The movie's plot is: " + JSON.parse(body).Plot);

	console.log("The movie's actors are: " + JSON.parse(body).Actors);

	console.log("The movie's country of production is: " + JSON.parse(body).Country);
  }
});
}

function doIt(){
	fs.readFile("random.txt", "utf8", function(error,data){
		var content = data.split(",");

		command1 = content[0];
		command2 = content[1];

switch(command1){
	case "my-tweets":
	myTweets();
	break;
	case "spotify-this-song":
	musicSearch(command2.trim());
	break;
	case "movie-this":
	movieSearch(command2);
	break;
	case "do-what-it-says":
	doIt();
	break;


}

	});

}
function log (command, input){

	logCount++

	var log = logCount + " " + command + " " + input +"\r\n";
	fs.appendFile("logs.txt", log , function(err) {
	 //if an error occurs
	  if (err) {
	    console.log(err);
	  }

	  else {
	    console.log("Your query has been logged!");
	  }
	});

}



