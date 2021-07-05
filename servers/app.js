var Request = require("request");
var SpotifyWebApi = require('spotify-web-api-node');
var geohash = require('ngeohash');

const express = require('express');
const app = express();

var spotApi = new SpotifyWebApi({
  clientId: '0c6a495c28184a3f9c13abe8ebca29cd',
  clientSecret: 'f32d66bd490a4c24bd0f3910f2ffd9b6'
});



app.get('/', (getre,res) => {
  res.send("Can Connect");
});


//app.use(express.static('HW8'));
app.get('/searchArtist/:artistname', (getre,res) => {
  spotApi.clientCredentialsGrant().then(
    function(data) {
      spotApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('spotify access error', err);
    }
  ).then(function(data){
    spotApi.searchArtists(getre.params.artistname)
    .then(function(data) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(data.body);
    }, function(err) {
      console.error(err);
    });  
  });
});

app.get('/autocom/:autocomword', (getre,res) => {
  Request.get("https://app.ticketmaster.com/discovery/v2/suggest?apikey=aj32lPLLBWnbiazafkBDV9SGfv7OlsFb&keyword="+getre.params.autocomword, (error, response, body) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(body);
  });
});


app.get('/search/keyword/:eventKeyword/radius/:radius/typeunit/:unit/lat/:latitude/lng/:longitude', (req,res) => {

  Request.get("https://app.ticketmaster.com/discovery/v2/events.json?apikey=aj32lPLLBWnbiazafkBDV9SGfv7OlsFb&keyword="+req.params.eventKeyword+"&segmentId="+req.query.segmentId+"&radius="+req.params.radius+"&unit="+req.params.unit+"&sort=date,asc&geoPoint="+geohash.encode(req.params.latitude,req.params.longitude), (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(body);
  });
});












app.get('/place/:placeword', (getre,res) => {
  Request.get("https://maps.googleapis.com/maps/api/geocode/json?address="+getre.params.placeword+"&key=AIzaSyAmMccdgisaX-0BuAlilryVb5WNIn2bBkQ", (error, response, body) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(body);
    });
  });











  app.get('/img/:imagename', (getre,res) => {
    Request.get("https://www.googleapis.com/customsearch/v1?q="+getre.params.imagename+"&cx=f067f294bffd960f3&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyAmMccdgisaX-0BuAlilryVb5WNIn2bBkQ", (error, response, body) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(body);
    });
  });
  



  app.get('/searchVenue/:venuename', (getre,res) => {
    Request.get("https://app.ticketmaster.com/discovery/v2/venues/?apikey=aj32lPLLBWnbiazafkBDV9SGfv7OlsFb&keyword="+getre.params.venuename, (error, response, body) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(body);
    });
  });

  app.get('/searchDetails/:eventname', (getre,res) => {
    Request.get("https://app.ticketmaster.com/discovery/v2/events/"+getre.params.eventname+"?apikey=aj32lPLLBWnbiazafkBDV9SGfv7OlsFb", (error, response, body) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(body);
    });
  });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
