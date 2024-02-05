import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';



const SendTransaction = ({ signer, account }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const isValidInput = () => account && recipient && amount;

    const handleSendEther = async () => {
        const etherscanURL = `https://sepolia.etherscan.io/tx/${txHash}`;

        if (!isValidInput()) {
            console.error('Invalid inputs.');
            return;
        }
        setIsLoading(true);

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
        finally {
            setIsLoading(false);
        }
    };
    const etherscanURL = txHash ? `https://sepolia.etherscan.io/tx/${txHash}` : null;

    useEffect(() => {
        // Clear input values after txHash is updated
        if (txHash) {
            setRecipient('');
            setAmount('');
        }
    }, [txHash]);


    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md my-8">
            <h2 className="text-2xl font-bold mb-4">Send Ether</h2>
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
                Amount (ETH):
                <input
                    type="text"
                    value={amount}
                    className="border w-full p-2 rounded-md"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <button
                onClick={handleSendEther}
                className="bg-blue-500 text-white rounded-md px-4 py-2"
                disabled={isLoading}

            >
                {isLoading ? 'Sending...' : 'Send Ether'}
            </button>
            {txHash && (
                <div className="mt-4">
                    <p className="font-bold text-lg">Transaction Hash:</p>
                    <p style={{ wordBreak: 'break-all' }}><a href={etherscanURL} target="_blank" rel="noopener noreferrer" >
                        <strong>click here to see transaction</strong> </a>
                    </p>
                </div>
            )}

        </div>
    );
};

export default SendTransaction;
