// npm i xrpl@4.2.0
const xrpl = require("xrpl")

// Wrap code in an async function so we can use await
async function main() {
  // this local account can't be inserted inside XRP Network
  // const test_wallet = xrpl.Wallet.generate()
  // console.log("Local account (not connected to XRP blockchain) = ", test_wallet)

  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

  await client.connect();
  /*
  // this funded account is working only in XRP test network
  const fund_result = await client.fundWallet();
  const test_wallet = fund_result.wallet;
  console.log(fund_result);
  */
  await client.disconnect();
} // end main
  
main();

/*
Local account (not connected to XRP blockchain) = Wallet {
  publicKey: 'ED441868C001262C0EDA37E6D8066C6A0CB9914495F1AD44CC5E34946893ECDFFC',
  privateKey: 'ED42BF57DCBA4C416DBD1F6F479B968C392C08DCEE82B914647FDAB9FA44B153A0',
  classicAddress: 'rnup1vptH4xHNn3P8FAhgQHYzz7XAMnH1r',
  seed: 'sEd7XkGa9tLWmGAy2yzDtNndA2AaBZs'
}
// funded in test network from faucet - 1st run:
{
  wallet: Wallet {
    publicKey: 'EDBBFFBF0E87F53D67D26EAF40150369DE2386A6F3559D8152E9B5992B7F662174',
    privateKey: 'ED1427C8BD06E3B5E8DF07101E8BFD76221AE7789FE95A4D94DEB2E4B3E996B594',
    classicAddress: 'raC4GDgaf5aucMmVRBDcqzc4xctAwA9KF8',
    seed: 'sEd7fa6wsQwfmodXj1mjTRHu4GBDaZz'
  },
  balance: 100
}
// funded in test network from faucet - 2nd run:
{
  wallet: Wallet {
    publicKey: 'ED97C4041B49BF2E4C0DB16398C3076BF07F9159A1638988AE1DBBA8B1318FD0B1',
    privateKey: 'EDFE5E77A2A0979B6AE4A410A373FF8708BFF0FD987CB81BB65634A19A74AFF19F',
    classicAddress: 'rBAvhmxVNRHXAGf13EseVyX3CWVH5HSVz4',
    seed: 'sEdS47n6iYRmo1KzyFriUKZXwvgU7tg'
  },
  balance: 100
}
*/
