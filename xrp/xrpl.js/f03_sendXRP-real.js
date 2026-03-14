const xrpl = require("xrpl")

async function sendXRP() {

  // Connect to XRPL node
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233" /*"wss://s1.ripple.com"*/)
  await client.connect()

  // Sender wallet (seed required)
  const senderWallet = xrpl.Wallet.fromSeed("sEdS...")

  const destination = "r..."

  // Create payment transaction
  const payment = {
    TransactionType: "Payment",
    Account: senderWallet.address,
    Destination: destination,
    Amount: xrpl.xrpToDrops("5") // send 5 XRP
  }

  // Autofill transaction fields (fee, sequence, etc.)
  const prepared = await client.autofill(payment)

  // Sign transaction
  const signed = senderWallet.sign(prepared)

  // Submit transaction
  const result = await client.submitAndWait(signed.tx_blob)

  console.log("Transaction result:", result)

  await client.disconnect()
}

sendXRP()
