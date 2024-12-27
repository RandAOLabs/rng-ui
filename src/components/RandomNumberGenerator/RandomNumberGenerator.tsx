import React, { useState, useCallback, useEffect } from 'react';
import { RandomClient } from 'ao-process-clients';
import { FaCircleQuestion } from 'react-icons/fa6';
import { InputBox } from '../InputBox';
import { DisplayBox } from '../DisplayBox';
import { LoadingSpinner } from '../LoadingSpinner';
import OutlinedButton from '../OutlinedButton';
import './RandomNumberGenerator.css';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('100');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCallbackId, setCurrentCallbackId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 20;

  const pollRandomNumber = useCallback(async (callbackId: string) => {
    try {
      const randomClient = RandomClient.autoConfiguration();
      const response = await randomClient.getRandomRequestViaCallbackId(callbackId);
      const entropy = response.randomRequestResponses[0].randomRequest.entropy;
      console.log('Response:', response);
      if (response && entropy) {
        // Use the entropy to generate a number in the specified range
        const seed = BigInt(entropy);
        const minNum = parseInt(min);
        const maxNum = parseInt(max);
        const range = maxNum - minNum + 1;
        
        // Generate random number using the entropy as seed
        const random = minNum + Number(seed % BigInt(range));
        
        setRandomNumber(random);
        setLoading(false);
        setCurrentCallbackId(null);
        setError(null);
        setAttempts(0);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error polling random number:', error);
      return false;
    }
  }, [min, max]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (loading && currentCallbackId) {
      intervalId = setInterval(async () => {
        setAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_ATTEMPTS) {
            setLoading(false);
            setError('Failed to generate random number after maximum attempts. Please try again.');
            setCurrentCallbackId(null);
            clearInterval(intervalId);
          }
          return newAttempts;
        });
        
        const success = await pollRandomNumber(currentCallbackId);
        if (success) {
          clearInterval(intervalId);
        }
      }, 20000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loading, currentCallbackId, pollRandomNumber]);

  const generateUUID = (): string => {
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = async () => {
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

    setLoading(true);
    setRandomNumber(null);
    setError(null);
    setAttempts(0);

    try {
      const randomClient = RandomClient.autoConfiguration();
      const callbackId = `random-${Date.now()}`;
      // const callbackId = await randomClient.getCallingWalletAddress();
      const success = await randomClient.createRequest(
        ['XUo8jZtUDBFLtp5okR12oLrqIZ4ewNlTpqnqmriihJE', 'c8Iq4yunDnsJWGSz_wYwQU--O9qeODKHiRdUkQkW2p8'],
        undefined,
        callbackId
      );

      if (success) {
        setCurrentCallbackId(callbackId);
      } else {
        setLoading(false);
        setError('Failed to create random number request');
      }
    } catch (error) {
      console.error('Error generating random number:', error);
      setLoading(false);
      setError('Error generating random number');
    }
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
        <div className="button-info-container">
          <OutlinedButton
            text="Generate Random Number"
            onClick={handleGenerate}
            disabled={loading}
          />
          <a 
            href="https://x.com/RandAOToken/status/1869393055406493799"
            target="_blank"
            rel="noopener noreferrer"
            className="info-icon-link"
            title="Fast Decentralized Verifiable Random"
          >
            <FaCircleQuestion size={24} />
          </a>
        </div>
      </div>
      <div className="result-section">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner size={32} />
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          randomNumber !== null && (
            <DisplayBox
              label="Random Number"
              value={randomNumber}
            />
          )
        )}
      </div>
    </div>
  );
};
