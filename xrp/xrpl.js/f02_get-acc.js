// npm install xrpl
// tested with: npm install xrpl@4.2.0

// ism_ase_ro@cloudshell:~/blockchain/xrpjs$ npm ls
// xrpjs@ /home/ism_ase_ro/blockchain/xrpjs
// └── xrpl@4.2.0

// https://xrpl.org/docs/tutorials/javascript/build-apps/get-started
// https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-browser-wallet-in-javascript
// https://xrpl.org/docs/tutorials/javascript/build-apps/build-a-desktop-wallet-in-javascript
// https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info

// https://xrpl.org/docs/tutorials/how-tos/send-xrp
// https://xrpl.org/docs/tutorials/javascript/send-payments/create-accounts-send-xrp
// https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/quickstart/js/ripplex1-send-xrp.js
// https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/send-xrp/js/send-xrp.js
//
// https://learn.xrpl.org/course/code-with-the-xrpl/
// https://learn.xrpl.org/course/code-with-the-xrpl/lesson/get-started-with-the-xrpl-js-library/

// https://xrpl.org/docs/tutorials/java/build-apps/get-started 
// https://github.com/XRPLF/xrpl-dev-portal/blob/master/_code-samples/send-xrp/java/SendXrp.java

const xrpl = require("xrpl")

// Wrap code in an async function so we can use await
async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233"); // TEST Network
    // const client = new xrpl.Client("wss://s1.ripple.com"); // MAIN Network

    await client.connect();
  
    // ... custom code goes here
    // Address: raC4GDgaf5aucMmVRBDcqzc4xctAwA9KF8
    // Secret: sEd7fa6wsQwfmodXj1mjTRHu4GBDaZz
    const test_wallet1 = xrpl.Wallet.fromSeed("sEd7fa6wsQwfmodXj1mjTRHu4GBDaZz") // Test secret; don't use for real
    const test_wallet2 = xrpl.Wallet.fromSeed("sEdS47n6iYRmo1KzyFriUKZXwvgU7tg") // Test secret; don't use for real

    // const xrpAddress = "rLHzPsX6oXkzU2qL12kHCH8G8cnZv1rBJh"; // Kraken is shared accounts

    // https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_info
    /*
    Web-ocket:
    {
        "id": 2,
        "command": "account_info",
        "account": "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
        "ledger_index": "current",
        "queue": true
    }
    JSON-RPC:
    {
        "method": "account_info",
        "params": [
            {
                "account": "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",
                "ledger_index": "current",
                "queue": true
            }
        ]
    }
    */
    // Get info from the ledger about the address we just funded
    const response1 = await client.request({
        "command": "account_info",
        "account": test_wallet1.address,
        // "account": xrpAddress,
        "ledger_index": "current", // "ledger_index": "validated" /
        "queue": true
    });
    
    console.log(response1);
    console.log("XRP Balance 1 = ", response1.result.account_data.Balance/1000000);

    // Get info from the ledger about the address we just funded
    const response2 = await client.request({
        "command": "account_info",
        "account": test_wallet2.address,
        // "account": xrpAddress,
        "ledger_index": "current", // "ledger_index": "validated" /
        "queue": true
    });
    
    console.log(response2);
    console.log("XRP Balance 2 = ", response2.result.account_data.Balance/1000000);
  
    // Disconnect when done (If you omit this, Node.js won't end the process)
    await client.disconnect();
  }
  
  main();
