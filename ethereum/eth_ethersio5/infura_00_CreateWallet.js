// npm i ethers@5.7.1
// version 6.11.1 at level of March 2024
// here installed (last version of 5): npm i ethers@5.7.1
// eth_ethersio5@ /home/ism_ase_ro/blockchain/eth2/eth_ethersio5
// └── ethers@5.7.1

const { ethers } = require("ethers")

async function walletSample() {
    // Create a wallet instance from a mnemonic...
    var mnemonic = "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
    var walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)
    console.log('walletMnemonic = ', walletMnemonic)

    // ...or from a private key
    walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)
    console.log('walletPrivateKey = ', walletPrivateKey)
    
    console.log(walletMnemonic.address === walletPrivateKey.address)
    // true

    // The address as a Promise per the Signer API
    var adr1 = await walletMnemonic.getAddress()
    // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

    // A Wallet address is also available synchronously
    var adr2 = walletMnemonic.address
    // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

    console.log('adr1 = ', adr1, ", adr2 = ", adr2)

    // The internal cryptographic components
    walletMnemonic.privateKey
    // '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
    walletMnemonic.publicKey
    // '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

    // The wallet mnemonic
    console.log('walletMnemonic.mnemonic = ', walletMnemonic.mnemonic)
    // {
    //   locale: 'en',
    //   path: "m/44'/60'/0'/0/0",
    //   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
    // }

    // Note: A wallet created with a private key does not
    //       have a mnemonic (the derivation prevents it)
    
    console.log('walletPrivateKey.mnemonic = ', walletPrivateKey.mnemonic)
    // null

    // Signing a message
    var signedHelloMsg = await walletMnemonic.signMessage("Hello World")
    // '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'
    console.log('signedHelloMsg = ', signedHelloMsg)

    tx = {
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: ethers.utils.parseEther("0.005")
    }

    // Signing a transaction
    var signedTx = await walletMnemonic.signTransaction(tx)
    // '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'
    console.log('signedTx = ', signedTx)
}

walletSample()
