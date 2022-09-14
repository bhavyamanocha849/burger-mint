// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;


  
  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const  BurgerMintPartyNFT = await hre.ethers.getContractFactory("NFT");
  const signer = await BurgerMintPartyNFT.signer.address;
  console.log("Signer Address",signer)
  const gasPrice = await BurgerMintPartyNFT.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await BurgerMintPartyNFT.signer.estimateGas(
    BurgerMintPartyNFT.getDeployTransaction("SQB Mint Party","SQBMP","ipfs://QmQCtXdf8khvR39uNb6FGYwBdxDJEnV1RwLpqGABkxy5nD/","ipfs://QmdMoxDV8PADbTwYe5dSU4ibixpnYSTEiyp83CUrTVQz96"),
  );
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await BurgerMintPartyNFT.signer.getBalance();
  const chainID = await BurgerMintPartyNFT.signer.getChainId();
  console.log("Chain ID",chainID)
  console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
        deploymentPrice.sub(deployerBalance),
      )}`,
    );
  }

  const burgerMintPartyNFT = await BurgerMintPartyNFT.deploy("SQB Mint Party","SQBMP","ipfs://QmQCtXdf8khvR39uNb6FGYwBdxDJEnV1RwLpqGABkxy5nD/","ipfs://QmdMoxDV8PADbTwYe5dSU4ibixpnYSTEiyp83CUrTVQz96");
  await burgerMintPartyNFT.deployed();
  
  // const burgerMintPartyNFT = await BurgerMintPartyNFT.deploy("Burger Mint Party NFT","BMPSB","ipfs://QmQCtXdf8khvR39uNb6FGYwBdxDJEnV1RwLpqGABkxy5nD/","ipfs://QmdMoxDV8PADbTwYe5dSU4ibixpnYSTEiyp83CUrTVQz96");

  // await burgerMintPartyNFT.deployed();

  console.log(
    `NFT deployed address: ${burgerMintPartyNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
