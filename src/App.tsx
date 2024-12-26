import { useState } from 'react';
import './App.css';
import ConnectWalletButton from './components/ConnectWalletButton';
import Mint from './components/Mint';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="app-container">
      <ConnectWalletButton 
        onConnect={(connected) => setIsWalletConnected(connected)}
      />
      <Mint isWalletConnected={isWalletConnected} />
    </div>
  );
}

export default App;
