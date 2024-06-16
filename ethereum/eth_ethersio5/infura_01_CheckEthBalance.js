const { ethers } = require("ethers")
// import { ethers } from "ethers";

// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
// const provider = new ethers.providers.JsonRpcProvider()
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/5823...ad39")


async function getEthDetails() {
    // Look up the current block number
    await provider.getBlockNumber()
    // 14983200

    // Get the balance of an account (by address or ENS name, if supported by network)
    // balance = await provider.getBalance("ethers.eth")
    // { BigNumber: "182826475815887608" }
    //balance = /*await*/ provider.getBalance("0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3")
    balance1 = await provider.getBalance("0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3")
    balance2 = await provider.getBalance('0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77')

    console.log('wei - balance1 = ', balance1, ', balance2 = ', balance2)

    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    console.log("eth - balance1 = ", ethers.utils.formatEther(balance1))
    console.log("eth - balance2 = ", ethers.utils.formatEther(balance2))

    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    console.log(ethers.utils.parseEther("1.0"))
    // { BigNumber: "1000000000000000000" }
}

getEthDetails().then(() => process.exit(0))
