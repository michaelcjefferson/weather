import React from 'react';

const UnitSelector = ({unit, onUnitSelect}) => {
  const convert = (unit) => {
    if (unit === 'C') {
      return 'F';
    } else {
      return 'C'
    }
  }

  const newUnit = convert(unit);

  return (
    <button className="unit-selector" onClick={() => onUnitSelect(newUnit)}>C / F</button>
  )
};

export default UnitSelector;
