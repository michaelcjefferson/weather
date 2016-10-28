import React from 'react';

const WeatherInfo = ({weatherData, unit, placeName}) => {
  function checkUnit(temp, unit) {
    if (unit === 'F') {
      return temp * 1.8 + 32;
    } else {
      return temp;
    }
  }

  const roundedTemp = Math.round(checkUnit(weatherData.currently.temperature, unit));
  const weatherDescription = weatherData.currently.summary;
  const cloudCover = Math.round(weatherData.currently.cloudCover * 100);
  const humidity = Math.round(weatherData.currently.humidity * 100);

  return (
    <div className="weather-info">
      <div className="cloud">
        <div>{cloudCover}%</div>
        <div>cloudy</div>
      </div>
      <div className="center">
        <div className="placename">{placeName}</div>
        <div className="temperature">
          <div className="temperature-number">{roundedTemp}&deg;</div>
          <div className="temperature-unit">{unit}</div>
        </div>
        <div className="weather-description">{weatherDescription}</div>
      </div>
      <div className="humidity">
        <div>{humidity}%</div>
        <div>humidity</div>
      </div>
    </div>
  );
};

export default WeatherInfo;
