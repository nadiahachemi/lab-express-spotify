var SpotifyWebApi = require('spotify-web-api-node');


// Remember to paste here your credentials
var clientId = 'cdeee2f0df004792834f9d31e920a2c5',
    clientSecret = 'bb23e01689ef4c2fa71d8ad1ecec0861';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

const express = require('express');
const app = express();
const hbs = require('hbs');


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');


app.listen(3000, () =>{
    console.log("You're connected to server genius ")
});

//ROUTE FOR HOME //

app.get("/", (req, res, next)=>{
    res.render("home.hbs")
});

//ROUTE FOR ARTIST//
app.get("/artist", (req, res, next)=>{
spotifyApi.searchArtists(req.query.artist_query)
    .then(data => {
      //res.send(data);
     // const artist = data.body.artists.items.name;
       res.locals.artistsResults = data.body.artists.items
      // res.locals.albumsResults = data.body.albums.items
     res.render("artist.hbs")
     })
    .catch(err => {
      console.log( err );
    })
  })