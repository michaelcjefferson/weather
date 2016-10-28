var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    request = require('request'),
    config = require('./config'),
    path = require('path');

function makeUrl(body) {
  return config.apiUrl + body.lat + ',' + body.lon + config.apiOpts;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.post('/getDataFromForecast', function(req, res, next){
  var url = makeUrl(req.body);
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // The response from forecast.io is a string, so convert it to an object using JSON.parse
      var data = JSON.parse(body);
      res.json(data);
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(config.port);
console.log('Server running on ' + config.port);
