import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import MainMint from './components/MainMint'
import { useState } from 'react';
import Loading from "./components/Loader"


function App() {
  const [accounts,setAccounts] = useState([]);
  const isConnected = Boolean(accounts[0]);
  const [isLoading,setIsLoading] = useState(false);
  const setLoadingState = (flag)=>{
    setIsLoading(flag);
  }
  async function connectAccount(){
      setIsLoading(true)
      if(window.ethereum){
          const accounts = await window.ethereum.request({
               method: "eth_requestAccounts",
          })
          setAccounts(accounts);
          setIsLoading(false)
      }
  }
  return (
    <div className="App moving-background" >
      <div className="hatoda"></div>
        {/* <NavBar accounts = {accounts} setAccounts={setAccounts}/> */}
        {
          isLoading &&  <Loading/>
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
  );
}

export default App;
