// 1. create account on Infura or Alchemy
// 2. npm install web3@4.6.0
// 3. npm i solc@0.8.25


// RUN ANY TIME

const { Web3 } = require("web3");
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("Faucet.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = "sepolia"; // process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/5823...ad39",
        //`https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
      ),
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    '0xb08f...1bd0',
    // '0x' + process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    '0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9', // '0x66C7D6Fa2cd6514157Ac77ac7096560ec63cDE77', 
    // '0x501507CdC588dc181bd385121d396abF2F846094', // '0x3bD576E0A21Ef09370020E0494C7B1235ece2559', // '0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9',// process.env.DEMO_CONTRACT,
  );
  // Issuing a transaction that calls the `echo` method
  const method_abi = contract.methods.withdraw(web3.utils.toWei('0.1', 'ether')).encodeABI();
  const tx = {
    from: signer.address,
    to: contract.options.address,
    data: method_abi,
    value: '0',
    gasPrice: '100000000000',
  };
  const gas_estimate = await web3.eth.estimateGas(tx);
  tx.gas = gas_estimate;
  const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
  console.log("Raw transaction data: " + ( signedTx).rawTransaction);
  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

/*
Raw transaction data: 0xf88c1285174876e800827917940bd278554636bd8b0a9ea7ca5fa906d599e43dc980a42e1a7d4d00000000000000000000000000000000000000000000000000071afd498d00008401546d72a083c3c1e56607671929090fff3a5ac849150bebad583c96c31ffee5cb183d6ce4a07768bc539f9561ac2dc8f4051563e017b205f315eac72669ed59621add78012c
Mining transaction ...
https://sepolia.etherscan.io/tx/0x55665b67ff9eec1fd966a65c097a8fede2426a41c7c1afdf32e45d7dcb645f8d
Mined in block 5486703
*/

main();
