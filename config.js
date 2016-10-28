module.exports = {
  'port': process.env.PORT || 1000,
  // The base URL of the weather API, plus the API key that goes with it
  'apiUrl': 'https://api.forecast.io/forecast/dd4496a6e5d62813e9085efdd40993af/',
  // The options to be added to the API request
  'apiOpts': '?units=ca&exclude=minutely,hourly,daily,alerts,flags'
};
