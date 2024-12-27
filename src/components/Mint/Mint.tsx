import React, { useCallback } from 'react';
import { TokenClient } from 'ao-process-clients';
import OutlinedButton from '../OutlinedButton';
import './Mint.css';
import { useWallet } from '../../context/WalletContext';
import { useToken } from '../../context/TokenContext';

const Mint: React.FC = () => {
  const { isConnected } = useWallet();
  const { refreshBalance } = useToken();
  const quantity = "1";

  const handleMint = useCallback(async () => {
    try {
      const tokenClient = TokenClient.autoConfiguration();
      const success = await tokenClient.grant(quantity);
      console.log(`Tokens minted: ${success}`);
      await refreshBalance();
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  }, [quantity, refreshBalance]);

  if (!isConnected) {
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
