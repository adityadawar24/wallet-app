// GetBalance.js
import React, { useState } from 'react';
import Web3 from 'web3';
import './GetBalance.css';

function GetBalance({ connectedAccount }) {
  const [balance, setBalance] = useState(null);

  const getEthBalance = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const ethBalance = await web3.eth.getBalance('0xDc8f10dCF9DF0070e22903C2D11a4DcF31b07047');
      setBalance(web3.utils.fromWei(ethBalance, 'ether'));
    } catch (error) {
      console.error('Error fetching Ethereum balance:', error);
    }
  };

  return (
    <div className="balance-container">
    <button className="balance-button" onClick={getEthBalance}>Get Balance</button>
    {balance && (
      <p className="balance-text">Balance: {balance} ETH</p>
    )}
  </div>
  );
}

export default GetBalance;
