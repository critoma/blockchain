
// cd /home/secitc/blockchain/eth2/eth_web3js
// npm i web3
// npm ls
// ... => web3@4.16.0

const { Web3 } = require("web3");
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");
const fs = require("fs");

// Configuring the connection to an Ethereum node
const network = "sepolia"; // process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://sepolia.infura.io/v3/582...aad39",
    //`https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
  ),
);

/*
https://sepolia.etherscan.io/tx/0x4d060fe5bf3f4ad70093dd8c25c300e2064b1ac649adb3e6da5f4556e6ebaeea
Contract deployed at 0xd07b867f560c20e3aE2bacd67C1140D33dFEe780
Eventually Add STORAGE_CONTRACT to the.env file to store the contract address: 0xd07b867f560c20e3aE2bacd67C1140D33dFEe780

*/
// Load the compiled contract's ABI and bytecode
//const abi = JSON.parse(fs.readFileSync('SimpleStorage_sol_SimpleStorage.abi').toString());
const { abi, bytecode } = JSON.parse(fs.readFileSync("Storage.json"));
//const bytecode = '0x6080604052348015600e575f5ffd5b506101298061001c5f395ff3fe6080604052348015600e575f5ffd5b50600436106030575f3560e01c80632e64cec11460345780636057361d14604e575b5f5ffd5b603a6066565b60405160459190608d565b60405180910390f35b606460048036038101906060919060cd565b606e565b005b5f5f54905090565b805f8190555050565b5f819050919050565b6087816077565b82525050565b5f602082019050609e5f8301846080565b92915050565b5f5ffd5b60af816077565b811460b8575f5ffd5b50565b5f8135905060c78160a8565b92915050565b5f6020828403121560df5760de60a4565b5b5f60ea8482850160bb565b9150509291505056fea26469706673582212204c75f4178f8a8423270e175b5cd83fa27489d677f5f69c0a6099101cf9c0572864736f6c634300081d0033';
//const bytecode = '0x' + fs.readFileSync('SimpleStorage_sol_SimpleStorage.bin').toString();


async function main() {
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    // process.env.SIGNER_PRIVATE_KEY,
    "0xb0...bd0",
  );
  web3.eth.accounts.wallet.add(signer);
  var limit = 50000;
  await interactWithStorageContract("0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3", "0xd07b867f560c20e3aE2bacd67C1140D33dFEe780", limit);
}


// Function to interact with the deployed contract
async function interactWithStorageContract(callerWalletAddress, contractAddress, limitGas) {
    const contractInstance = new web3.eth.Contract(abi, contractAddress);

    // Send a transaction to a function that modifies state
    contractInstance.methods.store(54).send({ from: callerWalletAddress, gas: limitGas })
        .on('transactionHash', (hash) => console.log('Transaction hash:', hash))
        .on('receipt', (receipt) => console.log('Transaction receipt:', receipt))
        .on('error', (error) => console.error('Error:', error));
    
    // Call again a read-only function of the smart contract
    contractInstance.methods.retrieve().call().then(console.log).catch(console.error);
}


/*
https://sepolia.etherscan.io/tx/0x477e1f6bfb819c702be2549b70f16d393b08ae69909e1bedafca49d7d14970b8

https://sepolia.etherscan.io/tx/0x3cf8bb33afd180ef1832bf96eb1b4231652e3fda14705da8f94a19c545b25b59

secitc@cloudshell:~/blockchain/eth2/eth_web3js_4.16$ node infuraWeb3_04_InteractSstorageSmartContract.js 
54n
Transaction hash: 0x3cf8bb33afd180ef1832bf96eb1b4231652e3fda14705da8f94a19c545b25b59
Transaction receipt: {
  blockHash: '0x9e34c6ade83af0f4c99f701c3b31d4587f609b2290d2bfddb30d96fe740a53d6',
  blockNumber: 7908401n,
  cumulativeGasUsed: 1760443n,
  effectiveGasPrice: 9411004329n,
  from: '0x3873deaa1e8278f89ffb12f2ac28f3682079f1c3',
  gasUsed: 23818n,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: 1n,
  to: '0xd07b867f560c20e3ae2bacd67c1140d33dfee780',
  transactionHash: '0x3cf8bb33afd180ef1832bf96eb1b4231652e3fda14705da8f94a19c545b25b59',
  transactionIndex: 4n,
  type: 2n
}
*/

main();
