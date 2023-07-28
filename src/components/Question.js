import React from 'react';
import Option from './Option';
import '../App.css';

const Question = ({ question, options, selectedOptions, handleOptionClick }) => {
  return (
    <div className="question-container">
      <div className="question">{question}</div>
      <ul className="options">
        {options.map((option, index) => (
          <Option
            key={index}
            option={option}
            selectedOptions={selectedOptions}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Question;
