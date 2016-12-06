/**
 * server.js
 * Main entry point for our Node.js web server. 
 * Node.js allows us to run JavaScript at the 
 * command line, and one of the things it lets us
 * do is listen for HTTP requests on a port, and
 * respond to them. This enables us to create a web
 * server.
 */

//TODO: use the "express" module to create a web server
//see http://expressjs.com/

//TODO: add an API route that uses the "yelp" module to 
//search for businesses using the Yelp API. See
//https://github.com/olalonde/node-yelp

var express = require("express");

var app = express();
var yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN.SECRET
});

app.use(express.static("./static"));
app.get("/api/v1/search", function (req, res, next) {
     var params = {
         term: "bars",
         ll: "47.65,-122.31"
     };
     yelp.search(params)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json(err);
        });
});


app.listen(3000, function() {
    console.log("server is listening on http://localhost:3000");
});
