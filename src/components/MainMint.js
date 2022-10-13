import { useState,useEffect } from 'react'
import { ethers,BigNumber } from 'ethers'
import React from 'react'
import './MainMint.css'
import CircularSlider from '@fseehawer/react-circular-slider';

import burgerMintPartyNFT from '../BurgerMintParty.json'


const burgerMintPartyNFTAddress = "0xa2fa6e3Dad7Da390D6bC9978DF30fE0dBC9920a2"

const MainMint=({accounts,setAccounts,setLoadingState})=>{

    const isConnected = Boolean(accounts[0]);
    const metamaskUrl = "https://metamask.io/download/"
    const [isMetamaskConnected,setIsMetamaskConnected] = useState(false) 
    const [mintedTokens,setMintedTokens] = useState(0);
    const [mintAmount,setMintAmount] = useState(1);
    async function handleMint(){
        setLoadingState(true)
        if(window.ethereum){

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const currentNetwork = await provider.getNetwork();
            // if(currentNetwork.chainId != 80001){
                //show a comment to connect to the actual network
                //find if there are any networks with the given chainId
                //if not then add a newtork with that chain ID and add a chain ID

                //Is it possible to fetch the tokens from a faucet
            // }


            const signer = provider.getSigner();
            const contract = new ethers.Contract( 
                burgerMintPartyNFTAddress,
                burgerMintPartyNFT.abi,
                signer
            );

            try{
                const response = await contract.mint(BigNumber.from(mintAmount));
                await response.wait()
                await getMintCount();
                console.log(response);
            }catch(err){
                setLoadingState(true)
                //not connected to right network
                console.log("ERROR: ", err)
            }
        }else{
            //OR: Redirect to the metamask installer page
            //etherscan not installed or connected

            setLoadingState(true)
            //set the chain Id and create an account with that network and chain ID

        }
        
        setLoadingState(false);
    }

    useEffect(() => {
        console.log("RUNS")
        getMintCount()
    },[mintAmount])

    const getMintCount = async () => {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract( 
                burgerMintPartyNFTAddress,
                burgerMintPartyNFT.abi,
                signer
            );
        
        
        try{
            const response =await contract.minterdTokenCount();
            console.log(response);
            const mintedTokenCount = parseInt(response._hex,16);
            setMintedTokens(mintedTokenCount);
        }catch(err){
            //
            console.log("ERROR: ", err)
        }
    }} 
    

    const  handleDecrement=()=>{
        if(mintAmount<=1)return 
        setMintAmount(mintAmount-1); 
    } 

    const  handleIncrement=()=>{
        if(mintAmount>=3)return 
        setMintAmount(mintAmount+1); 
    } 

    return(
        <div>
            <h1>Burger Mint Party</h1>
            <p>Its a Partaayyy, Grab a free Burger on successful mint of a burger NFT</p>
            {isConnected?
            (
                
                <div className="parent-main-mint">

                <div className="child-main-mint">
                    <div className="glassmorph-card">
                        <CircularSlider
                            knobDraggable={false}
                            min={0}
                            max={100}
                            knobSize={0}
                            label="Minted Tokens"
                            labelColor="white"
                            knobColor="#1d1d1d"
                            progressColorFrom="#f44369"
                            progressColorTo="#3e3b92"
                            progressSize={20}
                            trackColor="#eeeeee"
                            trackSize={16}
                            dataIndex={mintedTokens}
                            onChange={ value => { console.log(value); } }
                        />
                    </div>
                    <div className="counter">
                        <div>
                            <button onClick={handleDecrement}>-</button>
                        </div>
                        {
                            <div><p>{`${mintAmount}`}</p></div>
                        }
                        <div>
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                    <button className="btn" onClick={handleMint}>Mint Now</button>
                    </div>
                </div>
            ):(
                <p>You must be connected to MINT!!</p>
            )}
        </div>
    )
}

export default MainMint