import React, { useEffect } from 'react';
import './TokenBalance.css';
import { useToken } from '../../context/TokenContext';

export const TokenBalance: React.FC = () => {
  const { balance, refreshBalance } = useToken();

  useEffect(() => {
    refreshBalance();
    // Poll balance every 10 seconds
    const interval = setInterval(refreshBalance, 10000);
    return () => clearInterval(interval);
  }, [refreshBalance]);

  if (balance <= 0) return null;

  return (
    <div className="token-balance">
      <div className="balance-label">$RAO TEST TOKEN</div>
      <div className="balance-value">{balance}</div>
    </div>
  );
};
