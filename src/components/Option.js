import React from 'react';
import '../App.css';

const Option = ({ option, selectedOptions, handleOptionClick }) => {
  return (
    <li>
      <button
        className={selectedOptions.includes(option) ? 'selected' : ''}
        onClick={() => handleOptionClick(option)}
        disabled={selectedOptions.length > 0}
      >
        {option}
      </button>
    </li>
  );
};

export default Option;
