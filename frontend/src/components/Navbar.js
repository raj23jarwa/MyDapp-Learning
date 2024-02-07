import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Navbar = () => {
  const [connectedWallet, setConnectedWallet] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.ethereum && window.ethereum.selectedAddress) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          setConnectedWallet({
            address,
            signer,
          });
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error.message);
      }
    };

    checkConnection();
  }, []); // Run this effect only once when the component mounts

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setConnectedWallet({
          address,
          signer,
        });
      } else {
        alert('MetaMask not detected. Please install MetaMask to use this feature.');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error.message);
      alert('Error connecting to wallet. Please try again.');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My DApp</div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            {connectedWallet ? `Connected: ${connectedWallet.address}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
