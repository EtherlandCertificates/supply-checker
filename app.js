const express = require('express')
require('dotenv').config()
const ethers = require('ethers');
const abi =  require('./erc20.abi.json');

// Setup
const app = express();
const PORT = process.env.PORT || 3000;
const RPC_KEY = process.env.RPC_KEY || "https://eth-mainnet.g.alchemy.com/v2/";
const ELAND_ADDRESS = "0x33e07f5055173cf8febede8b21b12d1e2b523205";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// Wallets used as locker
const ETHERLAND_WALLETS = ["0x77883d56e2dEeafA03D448C2030Be03fb92B1e91", "0x4D459b47d2310257e917e1352e833628c11267d2"];

// Provider
const alchemyProvider = new ethers.AlchemyProvider(1, RPC_KEY);
// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// Contract
const elandContract = new ethers.Contract(ELAND_ADDRESS, abi, signer);

// Total supply route
app.get('/api/totalsupply', async (req, res, next) => {
  try {
    let totalSupply = await elandContract.totalSupply(); // big number with 18 decimals
    totalSupply = String(Number(ethers.formatEther(totalSupply)).toFixed(4));
    console.log(totalSupply);
    res.send(totalSupply);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Circulating supply route
app.get('/api/circulatingsupply', async (req, res, next) => {
  try {
    const totalSupply = await elandContract.totalSupply(); // big number with 18 decimals
    let lockedSupply = 0n;
    for (let wallet of ETHERLAND_WALLETS) {
      lockedSupply += await elandContract.balanceOf(wallet);
    }
    let circulatingSupply = totalSupply - lockedSupply;
    circulatingSupply = String(Number(ethers.formatEther(circulatingSupply)).toFixed(4));
    console.log(circulatingSupply);
    res.send(circulatingSupply);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Etherlandwallets supply route
app.get('/api/etherlandwallets', async (req, res, next) => {
  try {
    let etherlandWalletsSupply = 0n;
    for (let wallet of ETHERLAND_WALLETS) {
      etherlandWalletsSupply += await elandContract.balanceOf(wallet);
    }
    etherlandWalletsSupply = String(Number(ethers.formatEther(etherlandWalletsSupply)).toFixed(4));
    console.log(etherlandWalletsSupply);
    res.send(etherlandWalletsSupply);
  } catch (e) {
    console.log(e);
    next(e);
  }
});


// Default route
app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

// Start the app
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});