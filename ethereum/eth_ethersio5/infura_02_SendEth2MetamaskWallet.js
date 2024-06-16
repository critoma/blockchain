const { ethers } = require("ethers")
// import { ethers } from "ethers";

// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
// const provider = new ethers.providers.JsonRpcProvider()
const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/5823...ad39")

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()

async function signTxAndSendEth() {
    walletPrivateKey = new ethers.Wallet('0xb08f...1bd0')
    console.log("wallet addr = ", walletPrivateKey.address, ", wallet pub key = ", walletPrivateKey.publicKey)

    // The connect method returns a new instance of the
    // Wallet connected to a provider
    wallet = walletPrivateKey.connect(provider)

    // Querying the network
    const bal = await wallet.getBalance()

    console.log("balance - bal = ", ethers.utils.formatEther(bal))


    // Signing transactions
    tx = {
        to: "0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77",
        value: ethers.utils.parseEther("0.005")
    }

    // Signing a transaction
    var txSigned = await walletPrivateKey.signTransaction(tx)
    console.log("txSigned = ", txSigned)

    // Sending transaction
    var txResult = await wallet.sendTransaction(tx)
    console.log("txResult = ", txResult)
}

signTxAndSendEth().then(() => process.exit(0))
