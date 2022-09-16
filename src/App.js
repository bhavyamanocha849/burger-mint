import './App.css';
import { ethers } from 'ethers'
import MainMint from './components/MainMint'
import { useState } from 'react';
import Loading from "./components/Loader"

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import LoaderFull from './components/LoaderFull';

function App() {
  const [accounts,setAccounts] = useState([]);

  const isConnected = Boolean(accounts[0]);
  const [chainChangeLoader,setChainChangeLoader] = useState(false)
  const [chainAddLoader,setChainAddLoader] = useState(false)
  const [IsMetamaskInstalled,setIsMetamaskInstalled] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const setLoadingState = (flag)=>{
    setIsLoading(flag);
  }

  // const setLoaderOnChainChange = (flag)=>{
  //   setChainChangeLoader(flag)
  // } 
  // const setLoaderOnAddingChain = (flag)=>{
  //   setChainAddLoader(flag)
  // } 
  
  const changeChain=async()=>{
    setChainChangeLoader(true)
    setIsLoading(false)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });
      setChainChangeLoader(false);
    } catch (switchError) {
      setChainChangeLoader(false)
      if (switchError.code === 4902) {
        try {
          setChainAddLoader(true)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'mumbai',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              }
              },
            ],
          });
          setChainAddLoader(false);
        } catch (addError) {
        }
        setChainAddLoader(false)
      }
      if( switchError.code === 40001){
        console.log("User Denied.")
      }
    }


  }


  async function connectAccount(){
      setIsLoading(true)
      
      if(window.ethereum){
          const accounts = await window.ethereum.request({
               method: "eth_requestAccounts",
          })
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const {chainId } = await provider.getNetwork()
          
          console.log("chainID", chainId)
          if(chainId === 80001){
            setAccounts(accounts);
            setIsLoading(false)
          }else{
            console.log("current connected account not on mumbai testnet change the account to mumbai testnet")
            await changeChain()  
          }
      }else{
        //metamask not installed
        //download extension 
        setIsMetamaskInstalled(true)
        console.log("Cannot connect to metamask, download extension")
        setIsLoading(false)
      }
  }
  return (
    <div className="App moving-background" >

    {
      <LoaderFull isLoading={chainAddLoader} content='Chain Add'/>  
    }
    {
      <LoaderFull isLoading={chainChangeLoader} content='Chain Change'/>
    }
    <ToastContainer />
      <div className="hatoda"></div>
      <div className="main-container">
        {
          isLoading &&  <Loading/>
        }
        {
          IsMetamaskInstalled && <div><h1>Install Extension</h1><a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Install</a></div>
        }
        {
          !isLoading && 
          <div>
            <button 
            disabled={isConnected} 
            className="btn" 
            onClick = {connectAccount}
            >{ 
              !isConnected
              ? <span className="btn-online-container">Connect<span id="offline" className='status-icon'></span></span>
              : <span className="btn-online-container">Connected<span className='status-icon'></span></span> 
            }
            </button>
            <MainMint accounts={accounts} setAccounts={setAccounts} setLoadingState={setLoadingState}/>
          </div>
        }
        </div>
    </div>
  );
}

export default App;
