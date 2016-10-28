import React from 'react';
import Prediction from './prediction';

const PredictionList = ({hidePredictions, predictions, activePrediction, onPredictionSelect}) => {
  let predictionListClass = '';
  if (hidePredictions) {
    predictionListClass = 'prediction-list-hidden';
  } else {
    predictionListClass = 'prediction-list';
  }
  return (
    <ul className={predictionListClass}>
      {predictions.map(prediction => {
        // For each prediction that is mapped, it is given the boolean property isActive. isActive is set to true if both the prediction's place_id matches the activePrediction's place_id AND if there is an activePrediction in the first place
        const isActive = activePrediction && prediction.place_id === activePrediction.place_id;
        let predictionClass = '';
        if (isActive) {
          predictionClass = 'active-prediction';
        } else {
          predictionClass = 'inactive-prediction';
        }
        return <Prediction key={prediction.place_id}
                  className={predictionClass}
                  prediction={prediction}
                  isActive={isActive}
                  onSelect={() => onPredictionSelect(prediction)} />;
      })}
    </ul>
  )
}

export default PredictionList;
