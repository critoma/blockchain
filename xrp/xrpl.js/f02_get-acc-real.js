const xrpl = require("xrpl")

async function getXrpBalance(address) {
  const client = new xrpl.Client("wss://s1.ripple.com") // public XRPL node

  try {
    await client.connect()

    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated"
    })

    // Balance is returned in drops (1 XRP = 1,000,000 drops)
    const balanceDrops = response.result.account_data.Balance
    const balanceXrp = xrpl.dropsToXrp(balanceDrops)

    // console.log("Address:", address)
    console.log("Balance:", balanceXrp, "XRP")

    return balanceXrp
  } catch (error) {
    console.error("Error:", error)
  } finally {
    client.disconnect()
  }
}

// Example address
// getXrpBalance("rJmMuvTUMgGwzCwgufVgkDXNVP5pQu4Xnc") // this address doesn't exist
getXrpBalance("rPUT_A_REAL_ADDRESS_HERE")
