import React, { useState, useEffect } from 'react';

const Hero = ({ name, symbol, decimal, paused, owner, totalSupply, error, account, contract }) => {
  const [queryAddress, setQueryAddress] = useState('');
  const [queryBalance, setQueryBalance] = useState(null);
  const [balance, setBalance] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);


  const handleCheckBalance = async () => {
    setButtonClicked(!buttonClicked);

    if (account && contract) {

      try {
        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
      } catch (error) {
        console.error('Error checking balance:', error.message);
      }
    }
  };

  const handleQueryBalance = async () => {
    if (queryAddress && contract && account) {
      try {
        const queryBalance = await contract.balanceOf(queryAddress)/1000000000000000000;
        console.log('Query Balance:', queryBalance.toString());
        setQueryBalance(queryBalance.toString());
      } catch (error) {
        console.error('Error querying balance:', error.message);
      }
    } else {
      console.error('Invalid contract, account, or query address.');
    }
  };
  

  useEffect(() => {
    console.log('Account:', account);
    console.log('Contract:', contract);
  
    handleCheckBalance();
  }, [account, contract]);
  

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <>
          <p className="text-lg font-bold mb-2">
            <strong>Contract Owner:</strong> {owner}
          </p>
          <p className="text-lg font-bold">
            <strong>Token Name:</strong> {name}
          </p>
          <p className="text-lg font-bold">
            <strong>Token Symbol:</strong> {symbol}
          </p>
          <p className="text-lg font-bold">
            <strong>Token Decimal:</strong> {decimal}
          </p>
          <p className="text-lg font-bold">
            <strong>Token Supply:</strong> {totalSupply}
          </p>
          <p className="text-lg font-bold">
            <strong>Contract is :</strong>{paused ? 'paused' : 'Active'}
          </p>
          <button
            onClick={handleCheckBalance}
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2"
          >
            Check My Balance
          </button>
          
          {buttonClicked && (
            <p className="text-lg font-bold">
              <strong>Your Token Balance:</strong> {balance / 1000000000000000000} {symbol}
            </p>
          )}

          <label className="block mt-4 mb-2 font-bold text-lg">
            Query Token Balance (by address):
            <input
              type="text"
              value={queryAddress}
              className="border w-1/2 p-2 rounded-md"
              onChange={(e) => setQueryAddress(e.target.value)}
            />
          </label>
          
          <button
            onClick={handleQueryBalance}
            className="bg-purple-500 text-white rounded-md p-2"
          >
            Query Balance
          </button>
          
          {queryBalance !== null && (
            <p className="mt-2">
              Token Balance of {queryAddress}: {queryBalance} {symbol}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;
