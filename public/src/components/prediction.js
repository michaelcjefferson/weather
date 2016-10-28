import React from 'react';

const Prediction = ({key, prediction, isActive, onSelect, className}) => {
  return (
    <li className={className}
      onClick={event => {
        event.preventDefault();
        onSelect();
      }}>{prediction.place}</li>
  )
}

export default Prediction;
