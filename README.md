# Burger Mint Dapp

This Project uses hardhat to deploy your ERC721 to polygon mumbai testnetwork with the help of INFURA RPC.
Create an account on Infura, polygonscan and pinata(IPFS file upload).

Make a copy of the .env.example

```shell
cp .env.example .env
```

Update the .env with api keys.
Also create an account on Metamask.
ChainID: 80001
Name: mumbai

Get some fake matic from a faucet: https://faucet.polygon.technology/


Run the following commands to start.
```shell
npm i
npx hardhat clean
npx hardhat compile 
npx hardhat run scripts/deploy.js --network mumbai
npx hardhat verify --network mumbai 0xa2fa6e3Dad7Da390D6bC9978DF30fE0dBC9920a2 "{Contract Name}","{Contract Symbol}",{IPFS metadata url},"{IPFS metadata source for showing thumbnail untill NFT is revealed}"
```

Now you are good to go!🚀🚀🚀
