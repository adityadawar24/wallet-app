import React, { useState } from 'react';
import Web3 from 'web3';
import './TransactionHistory.css';

function TransactionHistory({ connectedAccount }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      if (!connectedAccount) {
        console.error('Error: No connected account');
        return;
      }

      if (!window.ethereum) {
        console.error('Error: MetaMask is not installed or not accessible.');
        return;
      }

      const web3 = new Web3(window.ethereum);
     const latestBlockBigInt = await web3.eth.getBlockNumber();
const latestBlockNumber = Number(latestBlockBigInt);  // Convert to Number from BigInt
const startBlock = Math.max(1, latestBlockNumber - 1000);

      const fetchedTransactions = [];

      for (let i = startBlock; i <= latestBlockNumber; i++) {
        const block = await web3.eth.getBlock(i, true);
        if (block && block.transactions) {
            block.transactions.forEach(tx => {
                console.log(connectedAccount.toLowerCase(), 'connectedAccount');
             
                if (tx.from === connectedAccount || tx.to === connectedAccount) {
                    console.log("fuvkkkk");

                    fetchedTransactions.push(tx); // Push transactions to the beginning of the array
                }
            });
        }
        console.log(fetchedTransactions,'array')
    
        if (fetchedTransactions.length >= 50) {
            break;
        }
    }
    
    

      setTransactions(fetchedTransactions);
      console.log('Fetched transactions:', fetchedTransactions);

    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  return (
    <div className="transaction-history">
      <button className="fetch-button" onClick={fetchTransactions}>Fetch Transaction History</button>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.hash}</td>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{Web3.utils.fromWei(tx.value, 'ether')} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
