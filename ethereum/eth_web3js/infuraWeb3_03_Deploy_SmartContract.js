// 1. create account on Infura or Alchemy
// 2. npm install web3@4.6.0
// 3. npm i solc@0.8.25

// RUN ONLY ONCE

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
        "https://sepolia.infura.io/v3/58238a3ee8aa4e27931f16cc886aad39",
        //`https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
      ),
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    '0xb08ff6820178c5b900f86dc995332d51eed31a887e9d997bf1feab357a171bd0',
    // '0x' + process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Eventually Add FAUCET_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`,
  );
}


/*
https://sepolia.etherscan.io/tx/0x49e90cffdfb42cce11da9412f18c037cf73904c3926a72fccbc81dc09bbc1e01
Contract deployed at 0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9
Eventually Add FAUCET_CONTRACT to the.env file to store the contract address: 0x0bD278554636bD8b0A9ea7CA5fa906D599e43Dc9
*/

main();

