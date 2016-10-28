import React from 'react';

const Background = ({weatherType}) => {
  if (!weatherType) {
    return <div></div>;
  }

  // A url creator with a check, so that there is a default background if weatherType is invalid or there is no gif with that name
  const weatherTypes = ['clear-day', 'clear-night', 'cloudy', 'fog', 'partly-cloudy-day', 'partly-cloudy-night', 'rain', 'sleet', 'snow', 'thunderstorm', 'wind'];
  function createPictureUrl(weatherType) {
    if (weatherTypes.indexOf(weatherType) === -1) {
      return '/img/default.gif';
    }
    return `/img/${weatherType}.gif`;
  }

  const pictureUrl = createPictureUrl(weatherType);
  const backgroundStyle = {
    backgroundImage: 'url(' + pictureUrl + ')'
  }

  return (
    <div className="background-picture" style={backgroundStyle}>
      {/*<img className="forecast-logo" src='../../img/powered_by_google_on_non_white.png'></img>*/}
      <img className="google-logo" src='../../img/powered_by_google_on_non_white.png'></img>
    </div>
  )
};

export default Background;
