// 1. create account on Infura or Alchemy
// 2. npm install web3@4.6.0
// 3. npm i solc@0.8.25

const fs = require("fs").promises;
const solc = require("solc");

async function main() {
  // Load the contract source code
  const sourceCode = await fs.readFile("Faucet.sol", "utf8");
  // const sourceCode = await fs.readFile("Storage.sol", "utf8");
  
  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, "Faucet");
  // const { abi, bytecode } = compile(sourceCode, "Storage");
  
  // Store the ABI and Bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.writeFile("Faucet.json", artifact);
  // await fs.writeFile("Storage.json", artifact);
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  };
  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main()
