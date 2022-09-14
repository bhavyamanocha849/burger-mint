import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import MainMint from './components/MainMint'
import { useState } from 'react';


function App() {
  const [accounts,setAccounts] = useState([]);
  const isConnected = Boolean(accounts[0]);

  async function connectAccount(){
      if(window.ethereum){
          const accounts = await window.ethereum.request({
               method: "eth_requestAccounts",
          })
          setAccounts(accounts);
      }
  }
  return (
    <div className="App moving-background" >
      {/* <NavBar accounts = {accounts} setAccounts={setAccounts}/> */}
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
      <MainMint accounts={accounts} setAccounts={setAccounts}/>
    </div>
  );
}

export default App;
