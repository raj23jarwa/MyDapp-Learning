import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const SendTransaction = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    const connectProvider = async () => {
      if (window.ethereum) {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await ethProvider.listAccounts();
        setProvider(ethProvider);
        setAccount(accounts[0] || '');
      } else {
        console.error('MetaMask not detected.');
      }
    };

    connectProvider();
  }, []);

  const handleSendEther = async () => {
    if (!provider || !account || !recipient || !amount) {
      console.error('Invalid inputs.');
      return;
    }

    const signer = provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });

      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash);
    } catch (error) {
      console.error('Error sending Ether:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md my-8">
      <h2 className="text-2xl font-bold mb-4">Send Ether</h2>
      <p className="mb-2">Your account: {account}</p>
      <label className="block mb-4">
        Recipient address:
        <input
          type="text"
          className="border w-full p-2 rounded-md"
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        Amount (ETH):
        <input
          type="text"
          className="border w-full p-2 rounded-md"
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button
        onClick={handleSendEther}
        className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Send Ether
      </button>
      {txHash && (
        <p className="mt-4">
          Transaction Hash: <span className="font-bold">{txHash}</span>
        </p>
      )}
    </div>
  );
};

export default SendTransaction;
