// 1. create account on Infura
// 2. npm install web3 && npm install ethereumjs-tx
// 3. npm ls web3 (1.3.4/1.3.3)
// 4. node testInfura.js in Google Shell Cloud: https://shell.cloud.google.com/?show=ide%2Cterminal

const Web3 = require('web3')
const rpcURL = "https://ropsten.infura.io/v3/58238a3ee8aa4e27931f16cc886aad39"

const web3 = new Web3(rpcURL)


// 1. get eth ropsten sold
const address = "0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77"

web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log("account2 = ", balance)
})

// 2. sign transactions between 2 accounts

/*
web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
})
*/

//const Tx     = require('ethereumjs-tx')
var Tx = require("ethereumjs-tx").Transaction
const account1 = '0x3873dEaA1E8278f89FfB12F2aC28f3682079F1c3' // Your account address 1
const account2 = '0xe53429EBB0239065b4e2Ffb58F2e794D6E568C77' // Your account address 2

const privateKey1 = Buffer.from('b0...', 'hex')
const privateKey2 = Buffer.from('02...', 'hex')


const txData = {
    //nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

/** Signs the given transaction data and sends it. Abstracts some of the details of 
  * buffering and serializing the transaction for web3.
  * @returns A promise of an object that emits events: transactionHash, receipt, confirmaton, error
*/
const sendRawTransaction = txData => (
  // get the number of transactions sent so far so we can create a fresh nonce
  web3.eth.getTransactionCount(account1).then(txCount => {
    const newNonce = web3.utils.toHex(txCount)
    const transaction = new Tx({ ...txData, nonce: newNonce }, { chain: 'ropsten' }) // or 'mainnet', 'rinkeby'
    transaction.sign(privateKey1)
    const serializedTx = transaction.serialize().toString('hex')
    return web3.eth.sendSignedTransaction('0x' + serializedTx)
  })
)


// fire away!
sendRawTransaction(txData).then(result => {
        console.log(result)
    }
).catch(err => console.error(err))

web3.eth.getBalance(account1, (err,bal) => { console.log('account 1 balance :' , web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(account2, (err,bal) => { console.log('account 2 balance :' , web3.utils.fromWei(bal, 'ether'))})


// 3. read the contract
const contractAddress = "0x501507CdC588dc181bd385121d396abF2F846094"
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "withdraw_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const contractInstance = new web3.eth.Contract(abi, contractAddress);
//console.log("contract = ", contractInstance)

// 4. put value into a contract
const txDataPutInContract = {
    //nonce:    web3.utils.toHex(txCount),
    contractAddress:       contractAddress,
    to:       contractAddress,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(55000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

const sendRawTransactionPutInContract = txData => (
  // get the number of transactions sent so far so we can create a fresh nonce
  web3.eth.getTransactionCount(account2).then(txCount => {
    const newNonce = web3.utils.toHex(txCount)
    const transaction = new Tx({ ...txData, nonce: newNonce }, { chain: 'ropsten' }) // or 'mainnet', 'rinkeby'
    transaction.sign(privateKey2)
    const serializedTx = transaction.serialize().toString('hex')
    return web3.eth.sendSignedTransaction('0x' + serializedTx)
  })
)

sendRawTransactionPutInContract(txDataPutInContract).then(result => {
        console.log(result)
    }
).catch(err => console.error(err))


web3.eth.getBalance(account1, (err, bal) => { console.log('a. account 1 balance :' , web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(account2, (err, bal) => { console.log('b. account 2 balance :' , web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(contractAddress, (err, bal) => { console.log('c. contractAddress balance :' , web3.utils.fromWei(bal, 'ether'))})


// 5. create transaction for withdrawing from the contract
contractInstance.methods.withdraw([web3.utils.toWei('0.1', 'ether'), { from: account1}, function (err,  result) { console.log(result) }]);


web3.eth.getBalance(account1, (err, bal) => { console.log('1. account 1 balance :' , web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(account2, (err, bal) => { console.log('2. account 2 balance :' , web3.utils.fromWei(bal, 'ether'))})
web3.eth.getBalance(contractAddress, (err, bal) => { console.log('3. contractAddress balance :' , web3.utils.fromWei(bal, 'ether'))})

/*
//contract.methods.totalSupply().call((err, result) => { console.log(result) })
//contract.methods.name().call((err, result) => { console.log(result) })
//contract.methods.symbol().call((err, result) => { console.log(result) })
//contract.methods.balanceOf(contractAddress).call((err, result) => { console.log(result) })
contract.methods.withdraw("100000000000000000").call((err, result) => { console.log(result) })
*/
