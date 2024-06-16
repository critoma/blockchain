// ism_ase_ro@cloudshell:~/blockchain/eth2/eth_ethersio6$ npm ls
// eth_ethersio6@ /home/ism_ase_ro/blockchain/eth2/eth_ethersio6
// └── ethers@6.11.1

const { ethers, HDNodeVoidWallet } = require("ethers")
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

var walletFromPrivateKey = null

async function sendEth2MetamaskWallet() {
    walletFromPrivateKey = new ethers.Wallet('0xb08f...1bd0')
    console.log("wallet addr = ", walletFromPrivateKey.address)


    // The connect method returns a new instance of the
    // Wallet connected to a provider
    wallet = walletFromPrivateKey.connect(provider) 
    console.log("wallet = ", wallet)

    // Querying the network
    const bal = await provider.getBalance(wallet.address)
    console.log("balance - bal = ", ethers.formatEther(bal))


    // Signing a message
    var msgSigned = await walletFromPrivateKey.signMessage("Hello World")
    console.log("msgSigned = ", msgSigned)

    // JSON for Transaction
    tx = {
        to: "0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77",
        value: ethers.parseEther("0.005")
    }

    // Signing a transaction
    var txSigned = await walletFromPrivateKey.signTransaction(tx)
    console.log("txSigned = ", txSigned)

    // Sending transaction
    var txResult = await wallet.sendTransaction(tx)
    console.log("txResult = ", txResult)
}


sendEth2MetamaskWallet()
