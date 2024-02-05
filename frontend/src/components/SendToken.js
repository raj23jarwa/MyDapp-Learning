import React, { useState } from 'react';
import { ethers } from 'ethers';
const sendToken = ({ contract, signer, account }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const isValidInput = () => account && recipient && amount;
  
    const handleSendTokens = async () => {
      if (!isValidInput() || isLoading) {
        console.error('Invalid inputs or transaction in progress.');
        return;
      }
  
      setIsLoading(true);
  
      try {
        // Assuming your contract has a transfer function
        const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
        const receipt = await tx.wait();
  
        setTxHash(receipt.transactionHash);
      } catch (error) {
        console.error('Error sending tokens:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md my-8">
        <h2 className="text-2xl font-bold mb-4">Send Tokens</h2>
        <p className="mb-2">Your account: {account}</p>
        <label className="block mb-4">
          Recipient address:
          <input
            type="text"
            value={recipient}
            className="border w-full p-2 rounded-md"
            onChange={(e) => setRecipient(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Amount (Tokens):
          <input
            type="text"
            value={amount}
            className="border w-full p-2 rounded-md"
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button
          onClick={handleSendTokens}
          className="bg-green-500 text-white rounded-md px-4 py-2"
        >
          Send Tokens
        </button>
        {txHash && (
          <p className="mt-4">
            Transaction Hash: <span className="font-bold">{txHash}</span>
          </p>
        )}
      </div>
    );
  };
  

export default sendToken