// https://docs.infura.io/tutorials/ethereum/send-a-transaction/use-web3.js?q=filter
// https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#getbalance
// https://docs.infura.io/tutorials/ethereum/send-a-transaction/use-ethers.js-infuraprovider-or-web3provider
// https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#signtransaction

// cd /home/secitc/blockchain/eth2/eth_web3js
// npm i web3
// npm ls
// ... => web3@4.6.0

const { Web3 } = require("web3");
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");
async function main() {
  // Configuring the connection to an Ethereum node
  const network = "sepolia"; // process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/5823...ad39",
      //`https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
  );

  /*
  const account1 = '0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3' // Your account address 1
  const account2 = '0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77' // Your account address 2
  /////const account2 = '0x50F08cb83D03DD43c7F8Eb9e8bc9A70259Ac94c8' // Your account address 2
  const privateKey1 = Buffer.from('b08f...1bd0', 'hex')
  //const privateKey2 = Buffer.from('021...ec5', 'hex')
  */

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    // process.env.SIGNER_PRIVATE_KEY,
    "0xb08f...1bd0",
  );
  web3.eth.accounts.wallet.add(signer);
  await web3.eth
    .estimateGas(
      {
        //from: signer.address,
        from: "0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3",
        to: "0x0998A2bD1c1E270c03158d3480002DAE980Ac394", // "0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9",
        value: web3.utils.toWei("0.02", "ether"),
      },
      "latest",
      ETH_DATA_FORMAT,
    )
    .then((value) => {
      limit = value;
    });

  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0x0998A2bD1c1E270c03158d3480002DAE980Ac394", // "0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9", // contract address
    value: web3.utils.toWei("0.02", "ether"),
    gas: limit,
    nonce: await web3.eth.getTransactionCount(signer.address),
    maxPriorityFeePerGas: web3.utils.toWei("20", "gwei"),
    maxFeePerGas: web3.utils.toWei("20", "gwei"),
    chainId: 11155111,
    type: 0x2,
  };
  signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
  console.log("Raw transaction data: " + signedTx.rawTransaction);
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
Raw transaction data: 0x02f87683aa36a7118504a817c8008504a817c8008252e4940bd278554636bd8b0a9ea7ca5fa906d599e43dc98708e1bc9bf0400080c080a0143b939c4727b98113ce022b6a1b4fa0628de457d92dae3f4d8e451df4c8b8c8a01a88572501bd0d38eb0c337c38cb8585cd8d6b16b72678043ef96e524f589446
Mining transaction ...
https://sepolia.etherscan.io/tx/0x83a4c8f8ca9d412ad74451fc74a2594dec7271220213be886564d1c31faeed9a
Mined in block 5486696
*/

main();
