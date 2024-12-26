import React, { useCallback } from 'react';
import { TokenClient } from 'ao-process-clients';
import OutlinedButton from '../OutlinedButton';
import './Mint.css';

interface MintProps {
  isWalletConnected: boolean;
  quantity?: string;
}

const Mint: React.FC<MintProps> = ({ 
  isWalletConnected,
  quantity = "1"
}) => {
  const handleMint = useCallback(async () => {
    try {
      const tokenClient = TokenClient.autoConfiguration();
      await tokenClient.mint(quantity);
      console.log('Successfully minted tokens');
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  }, [quantity]);

  if (!isWalletConnected) {
    return null;
  }

  return (
    <OutlinedButton
      text="MINT TOKEN"
      onClick={handleMint}
    />
  );
};

export default Mint;
