import React, { Component } from 'react';
import PredictionList from './prediction_list'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      predictions: [],
      activePrediction: null,
      activePredictionNumber: null,
      hidePredictions: true
    };
  }

  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35, lng: 35},
      zoom: 3
    });
    this.service = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(map);
  }

  fetchPredictions() {
    if (!this.state.term) {
      this.setState({
        predictions: [],
        activePrediction: null,
        hidePredictions: true
      });
      return;
    }
    const options = { input: this.state.term, types: ['(cities)'] };
    this.service.getPlacePredictions(options, (predictions, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        if (status == 'ZERO_RESULTS') {
          this.setState({
            predictions: [],
            activePrediction: null,
            hidePredictions: true
          });
          return;
        } else {
          alert(status);
          return;
        }
      }
      let cleanPredictions = [];
      predictions.forEach(prediction => {
        cleanPredictions.push({
          place: prediction.description,
          place_id: prediction.place_id
        });
      });
      this.setState({
        predictions: cleanPredictions,
        activePrediction: cleanPredictions[0],
        activePredictionNumber: 0,
        hidePredictions: false
      });
    });
  }

  // Call fetchPredictions after this.state.term has been updated
  onInputChange(term) {
    this.setState({term}, () => {
      this.fetchPredictions();
    });
  }

  onInputEvent(event) {
    switch (event.which) {
      case 40: // Down
        this.cycleForward(this.state.activePredictionNumber);
        break;
      case 38: // Up
        this.cycleBack(this.state.activePredictionNumber);
        break;
      case 13: // Enter
        event.preventDefault();
        this.selectPrediction(this.state.activePrediction);
        break;
      case 27: // Esc
        this.setState({
          term: '',
          predictions: [],
          hidePredictions: true
         });
         $('.search-field').blur();
        break;
      default:
        break;
    }
  }

  cycleForward(currentActivePredictionNumber) {
    if (currentActivePredictionNumber === 4) {
      this.setState({activePredictionNumber: 0, activePrediction: this.state.predictions[0]});
    } else {
      this.setState({activePredictionNumber: currentActivePredictionNumber + 1, activePrediction: this.state.predictions[currentActivePredictionNumber + 1]});
    }
  }

  cycleBack(currentActivePredictionNumber) {
    if (currentActivePredictionNumber === 0) {
      this.setState({activePredictionNumber: 4, activePrediction: this.state.predictions[4]});
    } else {
      this.setState({activePredictionNumber: currentActivePredictionNumber - 1, activePrediction: this.state.predictions[currentActivePredictionNumber - 1]});
    }
  }

  // Grab long and lat of selected prediction, and send that data back to weather info to get the weather for the new place
  selectPrediction(prediction) {
    this.placesService.getDetails({ placeId: prediction.place_id },
    function(data, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newPlaceData = {
          lat: data.geometry.location.lat(),
          lon: data.geometry.location.lng(),
          placeName: data.formatted_address.toUpperCase()
        };
        this.props.onPlaceUpdate(newPlaceData.lat, newPlaceData.lon, newPlaceData.placeName);
      } else {
        alert('Google Places Service failed because: ' + status);
      }
    }.bind(this));
    this.setState({
      term: '',
      predictions: [],
      hidePredictions: true
     });
  }

  hidePredictions() {
    this.setState({
      hidePredictions: true
    });
  }

  render() {
    return (
      <form className="search-bar" action="#">
        <input value={this.state.term} className="search-field"
            onChange={event => this.onInputChange(event.target.value)}
            onKeyDown={this.onInputEvent.bind(this)} placeholder="Search..." />
        <button className="search-submit"
          onClick={event => {
            event.preventDefault();
            this.selectPrediction(this.state.activePrediction);
          }}>
        <i className="fa fa-search fa-2x" aria-hidden="true" /></button>
        <PredictionList hidePredictions={this.state.hidePredictions}
          predictions={this.state.predictions}
          activePrediction={this.state.activePrediction}
          onPredictionSelect={this.selectPrediction.bind(this)} />
        <div id="map"></div>
      </form>
    );
  }
}

export default SearchBar;
