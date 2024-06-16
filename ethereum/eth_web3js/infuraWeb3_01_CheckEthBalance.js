// 1. create account on Infura or Alchemy
// 2. npm install web3@4.6.0

// ism_ase_ro@cloudshell:~/blockchain/eth2/eth_web3js$ npm ls
// eth_web3js@ /home/ism_ase_ro/blockchain/eth2/eth_web3js
// ├── solc@0.8.25
// └── web3@4.6.0

// obsolete:
// 2. npm install web3 && npm install ethereumjs-tx
// 3. npm ls web3 (1.3.4/1.3.3)
// npm remove web3 && npm install web3@1.3.4
// 4. node testInfura.js in Google Shell Cloud: https://shell.cloud.google.com/?show=ide%2Cterminal
// 
// sudo add-apt-repository ppa:ethereum/ethereum
// sudo add-apt-repository ppa:ethereum/ethereum-dev
// sudo apt-secure update
// sudo apt-get update
// sudo apt-get install solc

/*
curl --url https://mainnet.infura.io/v3/5823...ad39 \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
*/

// const Web3 = require('web3')
// Rosten is deprecated
//const rpcURL = "https://mainnet.infura.io/v3/5823...ad39"
//const rpcURL = "https://ropsten.infura.io/v3/5823...ad39"
//const rpcURL = "https://goerli.infura.io/v3/5823...ad39"
// const rpcURL = "https://sepolia.infura.io/v3/5823...ad39"

// const web3 = new Web3(rpcURL)




const { Web3 } = require("web3");
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");

const network = "sepolia"; // process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/5823...ad39",
      //`https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
);

// 1. get eth balance:
// const address = "0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3"
// const address = "0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77"

// contract addresses:
// const address = '0x501507CdC588dc181bd385121d396abF2F846094'
const address = '0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9'
web3.eth.getBalance(address).then( (wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("Sepolia ETH Account: ", address, " = ", balance)
});
