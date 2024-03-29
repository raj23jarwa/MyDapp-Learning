import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const SendTokenWithTokenAddress = ({ signer, account,contract }) => {
    const [recipient, setRecipient] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [balance, setBalance] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [tokenContract, setTokenContract] = useState(null);


    const isValidInput = () => account && recipient && tokenAddress && amount;
    


    const handleSendTokens = async () => {
        if (!isValidInput() || isLoading) {
            console.error('Invalid inputs or transaction in progress.');
            return;
        }

        setIsLoading(true);

        try {
            // Connect to the ERC-20 token contract using the provided token address
            const tokenContract = new ethers.Contract(tokenAddress, ['function transfer(address to, uint256 amount)'], signer);
    
            // Call the transfer function of the token contract to send tokens
            const tx = await tokenContract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
            const receipt = await tx.wait();

            setTxHash(receipt.transactionHash);
        } catch (error) {
            console.error('Error sending tokens:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (txHash) {
            setRecipient('');
            setTokenAddress('');
            setAmount('');
        }
    }, [txHash]);

        useEffect(() => {
            const fetchTokenBalance = async () => {
                try {
                    if (!tokenAddress || !account) return;
        
                    // Create an instance of the ERC-20 token contract using the token address
                    const tokenContract = new ethers.Contract(tokenAddress, ['function balanceOf(address) returns (uint256)'], signer);
        
                    // Call the balanceOf function of the token contract to fetch the balance
                    const balance = await tokenContract.balanceOf(account);
        
                    // Set the balance state with the fetched balance
                    setTokenBalance(balance.toString());
                } catch (error) {
                    console.error('Error fetching token balance:', error);
                }
            };
        
            // Call the fetchTokenBalance function when the token address or account changes
            fetchTokenBalance();
        }, [tokenAddress, account, signer]);
        
    

    const etherscanURL = txHash ? `https://sepolia.etherscan.io/tx/${txHash}` : null;

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md my-8">
            <h2 className="text-2xl font-bold mb-4">Send Tokens By Token Aaddress</h2>
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
                Token Address:
                <input
                    type="text"
                    value={tokenAddress}
                    className="border w-full p-2 rounded-md"
                    onChange={(e) => setTokenAddress(e.target.value)}
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
            {parseInt(amount) < parseInt(balance) && (
                <p className="text-red-500 mb-4">You are trying to send more tokens than your balance</p>
            )}
            {errorMsg && (
                <p className="text-red-500 mb-4">{errorMsg}</p>
            )}
            <button
                onClick={handleSendTokens}
                className={`bg-green-500 text-white rounded-md px-4 py-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Send Tokens'}
            </button>
            {txHash && (
                <div className="mt-4">
                    <p className="font-bold text-lg">Transaction Hash:</p>
                    <p style={{ wordBreak: 'break-all' }}>
                        <a href={etherscanURL} target="_blank" rel="noopener noreferrer">
                            <strong>click here to see transaction</strong>
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SendTokenWithTokenAddress;
