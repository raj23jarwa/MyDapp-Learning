// App.js
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import MyTokenABI from './artifacts/contracts/MyToken.sol/MyToken.json';
import SendTransaction from './components/SendTransaction';
import SendToken from './components/SendToken';
function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [decimal, setDecimal] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [owner, setOwner] = useState("");
  const [contractTotalSupply, setContractTotalSupply] = useState(0);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  // const [txHash, setTxHash] = useState('');
  const [signer,setSigner]=useState('');
  
   // Show success toast
  //  toast.success('Transaction sent successfully!', {
  //   position: toast.POSITION.TOP_CENTER,
  //   autoClose: 3000, // Auto close the notification after 3000 milliseconds (3 seconds)
  //   hideProgressBar: true,
  //   closeButton: false,
  // });
  useEffect(() => {
    const init = async () => {
      try {
        // Connect to Ethereum provider (e.g., MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider)
        // Check if MetaMask is installed
        if (!provider) {
          setError('MetaMask not detected. Please install MetaMask to use this feature.');
          console.log(error);
          return;
        }

        // Get signer (account)
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();

        // Instantiate the MyToken contract with the ABI
        const contractAddress = '0xc52A403670E01cfA0c02f9d04Be659B9a42c46A8'; // Replace with the actual contract address
        const TokenABI = MyTokenABI.abi;
        const contract = new ethers.Contract(contractAddress, TokenABI, signer);

        // Set state values
        setContract(contract);
        setAccount(address);

        // Fetch and set the owner address
        const ownerAddress = await contract.owner();
        setOwner(ownerAddress);

        // Fetch and set the symbol
        const tokenSymbol = await contract.symbol();
        setSymbol(tokenSymbol);

        // Fetch and set token name
        const tokenName = await contract.name();
        setName(tokenName);

        // Call the 'totalSupply' function from your contract
        const totalSupply = await contract.totalSupply();

        // Convert BigNumber to string
        const supplyString = totalSupply.toString();

        // Update the state with the total supply
        setContractTotalSupply(supplyString);

        const decimal = await contract.decimals();
        setDecimal(decimal);

        // Check if the contract is paused
        const pausedStatus = await contract.paused();
        setIsPaused(pausedStatus);

        // see contract
        console.log(contract);
        console.log(account);

      } catch (error) {
        console.error('Error:', error.message);
        setError('Error fetching contract data. Please try again.');
      }
    };

    init();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero
        name={name}
        symbol={symbol}
        decimal={decimal}
        paused={isPaused}
        owner={owner}
        totalSupply={contractTotalSupply}
      />
      <SendTransaction provider={provider} signer={signer} account={account} setProvider={setProvider} setAccount={setAccount}  />
      <SendToken provider={provider} signer={signer} account={account} setProvider={setProvider} setAccount={setAccount} contract={contract}  />

    </div>
  );
}

export default App;
