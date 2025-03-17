// tested with: npm install xrpl@4.2.0

const xrpl = require("xrpl")

// Wrap code in an async function so we can use await
async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    // const client = new xrpl.Client("wss://s1.ripple.com"); // REAL XRP Blockchain Network

    await client.connect();
  
    // ... custom code goes here, test wallet
    // Address: raC4GDgaf5aucMmVRBDcqzc4xctAwA9KF8
    // Secret: sEd7fa6wsQwfmodXj1mjTRHu4GBDaZz
    const wallet = xrpl.Wallet.fromSeed("sEd7fa6wsQwfmodXj1mjTRHu4GBDaZz") // Test secret; don't use for real

    // Prepare transaction -------------------------------------------------------
    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": wallet.address,
        "DeliverMax": xrpl.xrpToDrops("12"),
        "Destination": "rBAvhmxVNRHXAGf13EseVyX3CWVH5HSVz4"
    })
    const max_ledger = prepared.LastLedgerSequence
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)

    // Sign prepared instructions ------------------------------------------------
    const signed = wallet.sign(prepared)
    console.log("Identifying hash:", signed.hash)
    console.log("Signed blob:", signed.tx_blob)

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(signed.tx_blob)

    // Wait for validation -------------------------------------------------------
    // submitAndWait() handles this automatically, but it can take 4-7s.

    // Check transaction results -------------------------------------------------
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

    // Disconnect when done (If you omit this, Node.js won't end the process)
    await client.disconnect();
  }
  
  main();
