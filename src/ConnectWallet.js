import React, { useState } from 'react';
import './ConnectWallet.css';


function ConnectWallet({ onConnect }) {
  const [connectedNetwork, setConnectedNetwork] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);

  const connectToMetaMask = async (network) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await switchToNetwork(network);
      setConnectedNetwork(network);
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setConnectedAccount(accounts[0]);
      onConnect(accounts[0], network); // Notify parent component about connected account and network

    } catch (error) {
      console.error(error);
      alert("Error connecting to MetaMask. Please try again.");
    }
  };

  const switchToNetwork = async (network) => {
    if (window.ethereum) {
      try {
        // Request to switch to the specified network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: network.chainId }], // Chain ID for the selected network
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            // Request to add the specified network
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [network],
            });
          } catch (addError) {
            console.error(`Failed to add the ${network.name} network:`, addError);
          }
        } else {
          console.error(`Failed to switch to the ${network.name} network:`, switchError);
        }
      }
    } else {
      console.log('MetaMask is not installed!');
    }
  };

  const networks = [
    { name: 'Polygon', chainId: '0x89', rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/Lm6atAnKgOG2raGHQmg7Z1ZpDxCtcIjv', blockExplorerUrl: 'https://polygonscan.com/' },
    { name: 'Ethereum', chainId: '0x1', rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/Lm6atAnKgOG2raGHQmg7Z1ZpDxCtcIjv', blockExplorerUrl: 'https://etherscan.io/' },
    { name: 'Mumbai', chainId: '0x13881', rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/ouJ19TqUlmVWMQ0FoC94rrpVupZjtBAQ', blockExplorerUrl: 'https://explorer-mumbai.maticvigil.com/' }
  ];

  return (
    <div className="connect-wallet">
      <select className="network-select" onChange={(e) => connectToMetaMask(networks[e.target.value])}>
        <option disabled selected value="">Connect to MetaMask</option>
        {networks.map((network, index) => (
          <option key={index} value={index}>{network.name}</option>
        ))}
      </select>
      {connectedNetwork && (
        <p className="connected-text">Connected to <span className="connected-network">{connectedNetwork.name}</span> Network</p>
      )}
      {connectedAccount && (
        <p className="connected-text">Connected Account: <span className="connected-account">{connectedAccount}</span></p>
      )}
    </div>
  );
}

export default ConnectWallet;
