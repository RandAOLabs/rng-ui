import React, { useState } from 'react';
import { InputBox } from '../InputBox';
import { DisplayBox } from '../DisplayBox';
import OutlinedButton from '../OutlinedButton';
import './RandomNumberGenerator.css';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('100');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const handleGenerate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    
    if (isNaN(minNum) || isNaN(maxNum)) {
      alert('Please enter valid numbers');
      return;
    }
    
    if (minNum >= maxNum) {
      alert('Maximum must be greater than minimum');
      return;
    }

    const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    setRandomNumber(random);
  };

  return (
    <div className="rng-container">
      <div className="input-section">
        <InputBox
          label="Minimum"
          value={min}
          onChange={setMin}
          type="number"
          placeholder="0"
        />
        <InputBox
          label="Maximum"
          value={max}
          onChange={setMax}
          type="number"
          placeholder="100"
        />
      </div>
      <div className="button-section">
        <OutlinedButton
          text="Generate Random Number"
          onClick={handleGenerate}
        />
      </div>
      {randomNumber !== null && (
        <div className="result-section">
          <DisplayBox
            label="Random Number"
            value={randomNumber}
          />
        </div>
      )}
    </div>
  );
};
