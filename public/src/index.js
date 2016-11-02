import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import WeatherInfo from './components/weather_info';
import Background from './components/background';
import UnitSelector from './components/unit_selector';
import SearchBar from './components/search_bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
      weatherType: null,
      unit: 'C',
      placeName: ''
    };
  }

  componentDidMount() {
    this.geocoder = new google.maps.Geocoder;
    this.setWeatherData();
  }

  getWeatherDataFromCoords(lat, lon, placeName) {
    if (this.checkIfValidCoord(lat, lon)) {
      $.post('/getDataFromForecast', {lat: lat, lon: lon}, (data) => {
        if (this.state.weatherData != data) {
          this.setState({
            weatherData: data,
            weatherType: data.currently.icon
          });
          if (placeName) {
            this.setState({
              placeName: placeName
            });
          }
        }
      });
    } else {
      alert('The latitude and/or longitude are invalid');
    }
  }

  // When the app loads, ask client if they want to share location. If they do, set the weatherData and placeName to the place associated with their lat and lon. Otherwise, set it to Shanghai
  // IMPORTANT: CLEAN UP CALL TO GETWEATHERDATAFROMCOORDS BY CREATING A FUNCTION FOR THE GEOCODER CALL
  setWeatherData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeatherDataFromCoords(position.coords.latitude, position.coords.longitude);
        this.geocoder.geocode({'location':
          {lat: position.coords.latitude, lng: position.coords.longitude}
        }, (data, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (data) {
              let index = 0;
              let breaker = false;
              for (var i in data) {
                for (var j in data[i].types) {
                  if (data[i].types[j] === 'political') {
                    index = i;
                    breaker = true;
                  }
                }
                if (breaker) {
                  break;
                }
              }
              this.setState({
                placeName: data[index].formatted_address.toUpperCase()
              });
            } else {
              alert("Couldn't find the name of this location");
            }
          } else {
            alert("Google Geocoder failed because: " + status);
          }
        });
      });
    } else {
      this.getWeatherDataFromCoords(31.2327301, 121.47584);
      this.geocoder.geocode({'location':
        {lat: 31.2327301, lng: 121.47584}
      }, (data, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (data) {
            let index = 0;
            let breaker = false;
            for (var i in data) {
              for (var j in data[i].types) {
                if (data[i].types[j] === 'political') {
                  index = i;
                  breaker = true;
                }
              }
              if (breaker) {
                break;
              }
            }
            this.setState({
              placeName: data[index].formatted_address.toUpperCase()
            });
          } else {
            alert("Couldn't find the name of this location");
          }
        } else {
          alert("Google Geocoder failed because: " + status);
        }
      });
    }
  }

  checkIfValidCoord(lat, lon) {
    if ((typeof lat === 'number' && typeof lon === 'number') && (lat >= -90 && lat <= 90) && (lon >= -180 && lon <= 180)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (!this.state.weatherData) {
      return <div>...Loading...</div>;
    }
    return (
      <div className="main">
        <Background weatherType={this.state.weatherType} />
        <UnitSelector
          unit={this.state.unit}
          onUnitSelect={newUnit => { this.setState({ unit: newUnit }); }} />
        <SearchBar onPlaceUpdate={(lat, lon, placeName) => { this.getWeatherDataFromCoords(lat, lon, placeName); }} />
        <WeatherInfo weatherData={this.state.weatherData} unit={this.state.unit} placeName={this.state.placeName} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
