import './App.css';
import { WalletProvider } from './context/WalletContext';
import { TokenProvider } from './context/TokenContext';
import ConnectWalletButton from './components/ConnectWalletButton';
import Mint from './components/Mint';
import { Topbar } from './components/Topbar';
import { TokenBalance } from './components/TokenBalance';
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
          <div className="mint-section">
            <Mint />
            <TokenBalance />
          </div>
        )}
      </div>
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
