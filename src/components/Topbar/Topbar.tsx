import React from 'react';
import ConnectWalletButton from '../ConnectWalletButton';
import './Topbar.css';
import { useWallet } from '../../context/WalletContext';

export const Topbar: React.FC = () => {
  const { isConnected } = useWallet();

  return (
    <div className="topbar">
      {isConnected && (
        <div className="walletSection">
          <ConnectWalletButton />
        </div>
      )}
    </div>
  );
};
