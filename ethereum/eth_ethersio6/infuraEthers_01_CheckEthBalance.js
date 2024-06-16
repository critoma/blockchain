// npm i ethers
// this is 6.11.1 at level of March 2024
// versus: npm i ethers@5.7.1
// npm ls
// ... => ethers@6.11.1

// https://docs.ethers.org/v6/getting-started/
// https://docs.infura.io/tutorials/ethereum/send-a-transaction/send-a-transaction-ethers

const { ethers } = require("ethers")
// import { ethers } from "ethers";

// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
// const provider = new ethers.providers.JsonRpcProvider()
// const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/5823...ad39")


const network = "sepolia" // process.env.ETHEREUM_NETWORK;
const provider = new ethers.InfuraProvider(
    network,
    "5823...ad39" // process.env.INFURA_API_KEY
)


// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
// const signer = provider.getSigner()

async function getEthDetails() {
    // Look up the current block number
    await provider.getBlockNumber()
    // 14983200

    // Get the balance of an account (by address or ENS name, if supported by network)
    // balance = await provider.getBalance("ethers.eth")
    // { BigNumber: "182826475815887608" }
    //balance = /*await*/ provider.getBalance("0x3873d...F1c3")
    balance = await provider.getBalance("0x3873d...F1c3")

    //console.log("balance = ", balance)

    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    console.log("balance = " + ethers.formatEther(balance))
    // '0.182826475815887608'

    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    console.log(ethers.parseEther("1.0"))
    // { BigNumber: "1000000000000000000" }
}

getEthDetails()
