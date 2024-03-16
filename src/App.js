// App.js
import React, { useState } from 'react';
import './App.css';
import ConnectWallet from './ConnectWallet';
import GetBalance from './GetBalance';
import TransactionHistory from './TransactionHistory'; 


function App() {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [connectedNetwork, setConnectedNetwork] = useState(null); // Add state for connected network

  return (
    <div className="App">
      <header>
        <h1>Wallet App</h1>
      </header>
      <ConnectWallet onConnect={(account, network) => {
        setConnectedAccount(account);
        setConnectedNetwork(network); // Set connected network
      }} />
      <GetBalance connectedAccount={connectedAccount} />
      <TransactionHistory connectedAccount={connectedAccount} connectedNetwork={connectedNetwork} /> {/* Render TransactionHistory */}

    </div>
  );
}

export default App;
