// Hero.js
import React from 'react';


const Hero = ({ name, symbol, decimal, paused, owner, totalSupply,error }) => {
  // Rest of your component code remains unchanged
  // ...

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

          {/* <p className="text-lg font-bold">
            <strong>Total Supply:</strong> {totalSupply}
          </p> */}
          <p className="text-lg font-bold">
            <strong>Token Decimal:</strong> {decimal}
          </p>
          <p className="text-lg font-bold">
            <strong>Contract is :</strong>{paused ? 'paused' : 'Active'}</p>
        </>
      )}
    </div>
  );
};

export default Hero;
