// src/App.js

import React, { useState } from 'react';
import { ethers } from 'ethers';


function App() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [decimal, setDecimal] = useState(0);



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">Token Management</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Token Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Token Symbol</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Supply</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={totalSupply}
            onChange={(e) => setTotalSupply(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Decimal</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={decimal}
            onChange={(e) => setDecimal(parseInt(e.target.value, 10))}
          />
         
        </div>

        
        </div>
      </div>
  );
}

export default App;
