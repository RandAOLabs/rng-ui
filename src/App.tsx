import './App.css';
import { WalletProvider } from './context/WalletContext';
import { TokenProvider } from './context/TokenContext';
import ConnectWalletButton from './components/ConnectWalletButton';
import Mint from './components/Mint';
import { Topbar } from './components/Topbar';
import { TokenBalance } from './components/TokenBalance';
import { RandomNumberGenerator } from './components/RandomNumberGenerator';
import { SocialLinks } from './components/SocialLinks';
import { useWallet } from './context/WalletContext';

const AppContent: React.FC = () => {
  const { isConnected } = useWallet();

  return (
    <div className="app-container">
      <Topbar />
      <div className="content-container">
        {!isConnected ? (
          <ConnectWalletButton />
        ) : (
          <div className="connected-content">
            <div className="mint-section">
              <Mint />
              <TokenBalance />
            </div>
            <div className="rng-section">
              <RandomNumberGenerator />
            </div>
          </div>
        )}
      </div>
      <SocialLinks />
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <TokenProvider>
        <AppContent />
      </TokenProvider>
    </WalletProvider>
  );
}

export default App;
