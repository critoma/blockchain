// npm install xrpl
// tested with: npm install xrpl@3.0.0

// ism_ase_ro@cloudshell:~/blockchain/xrpjs$ npm ls
// xrpjs@ /home/ism_ase_ro/blockchain/xrpjs
// └── xrpl@3.0.0

// https://xrpl.org/docs/tutorials/javascript/get-started
// https://xrpl.org/docs/tutorials/tasks/send-xrp/

const xrpl = require("xrpl")

// Wrap code in an async function so we can use await
async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
  
    // ... custom code goes here
    // Address: rL4cV1LYcMx76HWj9W7bUDGcEHk863RmX1
    // Secret: sEdSWofBPPm2tNgo92GYf9dAANndHeb
    const test_wallet = xrpl.Wallet.fromSeed("sEdSWofBPPm2tNgo92GYf9dAANndHeb") // Test secret; don't use for real
    
    // Get info from the ledger about the address we just funded
    const response = await client.request({
        "command": "account_info",
        "account": test_wallet.address,
        "ledger_index": "validated"
    })
    console.log(response)
  
    // Disconnect when done (If you omit this, Node.js won't end the process)
    await client.disconnect()
  }
  
  main()
