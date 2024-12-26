import React, { useCallback, useState, useEffect } from 'react';
import OutlinedButton from '../OutlinedButton';
import { WalletConnectionProps } from './types';
import './ConnectWalletButton.css';

const ConnectWalletButton: React.FC<WalletConnectionProps> = ({ 
  onConnect, 
  isConnected,
  fixed = true,
  onWalletUpdate
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [connected, setConnected] = useState(isConnected || false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Address copied to clipboard');
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const updateWalletState = useCallback((walletAddress: string) => {
    setConnected(true);
    setAddress(walletAddress);
    onConnect?.(true);
    onWalletUpdate?.({ address: walletAddress });
  }, [onConnect, onWalletUpdate]);

  useEffect(() => {
    let mounted = true;
    
    const checkWalletConnection = async () => {
      if (window.arweaveWallet) {
        try {
          const address = await window.arweaveWallet.getActiveAddress();
          if (address && mounted) {
            updateWalletState(address);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();
    return () => { mounted = false; };
  }, [updateWalletState]);

  const connectWallet = useCallback(async () => {
    if (!window.arweaveWallet) {
      setError('ArConnect not found. Please install ArConnect extension.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
      const address = await window.arweaveWallet.getActiveAddress();
      
      if (address) {
        updateWalletState(address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [updateWalletState]);

  const disconnectWallet = useCallback(async () => {
    if (window.arweaveWallet) {
      try {
        await window.arweaveWallet.disconnect();
        setConnected(false);
        setAddress(null);
        onConnect?.(false);
        onWalletUpdate?.(null);
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
  }, [onConnect, onWalletUpdate]);

  return (
    <>
      <OutlinedButton
        text={isLoading ? 'Connecting...' : connected ? 'Disconnect' : 'Connect Wallet'}
        onClick={connected ? disconnectWallet : connectWallet}
        className={fixed ? 'fixed' : ''}
      />
      {connected && address && (
        <div className="wallet-address" onClick={() => copyToClipboard(address)} title="Click to copy">
          {shortenAddress(address)}
        </div>
      )}
      {error && (
        <div className="wallet-status">
          {error}
        </div>
      )}
    </>
  );
};

export default ConnectWalletButton;
