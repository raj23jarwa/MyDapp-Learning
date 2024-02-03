// Navbar.jsx

import React from 'react';
import { useState } from 'react';

const Navbar = () => {
    const [connectedAddress, setConnectedAddress] = useState(null);

    const connectWallet = async () => {
    
        try {
            // Request user accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Store the connected address in state
            setConnectedAddress(accounts[0]);
            // Do something with the user's accounts (e.g., store in state)
            console.log('Connected to MetaMask. User accounts:', accounts);
        } catch (error) {
            // Handle error or show a message to the user
            console.error('Error connecting to MetaMask:', error.message);
        }
    }
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Token Dapp</div>
                <div className="flex items-center">

                    {connectedAddress ? (
                        <div className="text-white mr-4">{connectedAddress}</div>
                    ) : null}

                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={connectWallet}>
                        {connectedAddress ? 'Connected' : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
