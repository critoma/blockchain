# What is an NFT on the XRP Ledger?

An NFT on the XRP Ledger is a unique token stored directly on-chain using the XLS-20 NFT Standard.

Unlike fungible tokens (like XRP or issued tokens), each NFT:
Has a unique ID
Can represent digital art, game items, tickets, certificates, etc.
Is owned by a single account
Can be minted, transferred, sold, or burned

NFT functionality is supported in the Node.js library xrpl.

# Typical NFT lifecycle:

- Mint NFT
- List NFT for sale
- Buy NFT
- Transfer NFT
- Burn NFT

# 1. Example: Mint an NFT

This creates a new NFT on the ledger.

const xrpl = require("xrpl")

async function mintNFT() {

  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  const wallet = xrpl.Wallet.fromSeed("YOUR_SEED")

  const mintTx = {
    TransactionType: "NFTokenMint",
    Account: wallet.address,
    URI: xrpl.convertStringToHex("https://example.com/nft-metadata.json"),
    Flags: 8, // transferable NFT
    NFTokenTaxon: 0
  }

  const prepared = await client.autofill(mintTx)
  const signed = wallet.sign(prepared)

  const result = await client.submitAndWait(signed.tx_blob)

  console.log(result)

  await client.disconnect()
}

mintNFT()

# 2. Get NFTs Owned by an Address
const xrpl = require("xrpl")

async function getNFTs(address) {

  const client = new xrpl.Client("wss://s1.ripple.com")
  await client.connect()

  const response = await client.request({
    command: "account_nfts",
    account: address
  })

  console.log(response.result.account_nfts)

  await client.disconnect()
}

getNFTs("rADDRESS")

# 3. Transfer an NFT
const xrpl = require("xrpl")

async function transferNFT() {

  const client = new xrpl.Client("wss://s1.ripple.com")
  await client.connect()

  const wallet = xrpl.Wallet.fromSeed("YOUR_SEED")

  const transferTx = {
    TransactionType: "NFTokenCreateOffer",
    Account: wallet.address,
    Destination: "rDESTINATION",
    NFTokenID: "NFT_ID_HERE",
    Amount: "0" // transfer for free
  }

  const prepared = await client.autofill(transferTx)
  const signed = wallet.sign(prepared)

  const result = await client.submitAndWait(signed.tx_blob)

  console.log(result)

  await client.disconnect()
}

transferNFT()

# NFT Metadata

Usually an NFT URI points to metadata JSON like:

{
  "name": "XRPL Art #1",
  "description": "Example NFT on XRPL",
  "image": "https://example.com/image.png",
  "attributes": [
    { "trait_type": "Color", "value": "Blue" }
  ]
}

# NFT Transaction Types on XRPL

| Transaction          | Purpose          |
| -------------------- | ---------------- |
| `NFTokenMint`        | Create NFT       |
| `NFTokenBurn`        | Destroy NFT      |
| `NFTokenCreateOffer` | Sell or transfer |
| `NFTokenAcceptOffer` | Buy NFT          |
| `NFTokenCancelOffer` | Cancel sale      |

# NFT Marketplace flow
Seller
  │
  │ Mint NFT
  ▼
NFT created
  │
  │ Create sell offer (10 XRP)
  ▼
Offer stored in ledger
  │
  │ Buyer accepts offer
  ▼
NFT transferred to buyer
XRP transferred to seller

# Example of NFT Metadata (nft.json)
{
  "name": "XRPL Demo NFT",
  "description": "Example NFT marketplace item",
  "image": "https://example.com/image.png",
  "attributes": [
    { "trait_type": "Rarity", "value": "Legendary" }
  ]
}

# Complete example in node.js

// npm install xrpl
const xrpl = require("xrpl")

async function nftMarketplaceDemo() {

  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  // Seller wallet
  const seller = xrpl.Wallet.fromSeed("SELLER_SEED")

  // Buyer wallet
  const buyer = xrpl.Wallet.fromSeed("BUYER_SEED")

  console.log("Seller:", seller.address)
  console.log("Buyer:", buyer.address)

  /* -------------------------
     1. MINT NFT
  ------------------------- */

  const mintTx = {
    TransactionType: "NFTokenMint",
    Account: seller.address,
    URI: xrpl.convertStringToHex("https://example.com/nft.json"),
    Flags: 8, // transferable
    NFTokenTaxon: 0
  }

  const mintPrepared = await client.autofill(mintTx)
  const mintSigned = seller.sign(mintPrepared)

  const mintResult = await client.submitAndWait(mintSigned.tx_blob)

  console.log("NFT Minted")

  /* -------------------------
     2. GET NFT ID
  ------------------------- */

  const nftResponse = await client.request({
    command: "account_nfts",
    account: seller.address
  })

  const nft = nftResponse.result.account_nfts[0]
  const nftID = nft.NFTokenID

  console.log("NFT ID:", nftID)

  /* -------------------------
     3. CREATE SELL OFFER
  ------------------------- */

  const sellOfferTx = {
    TransactionType: "NFTokenCreateOffer",
    Account: seller.address,
    NFTokenID: nftID,
    Amount: xrpl.xrpToDrops("10"), // price 10 XRP
    Flags: 1 // sell offer
  }

  const sellPrepared = await client.autofill(sellOfferTx)
  const sellSigned = seller.sign(sellPrepared)

  const sellResult = await client.submitAndWait(sellSigned.tx_blob)

  console.log("Sell offer created")

  /* -------------------------
     4. FIND OFFER ID
  ------------------------- */

  const offers = await client.request({
    command: "nft_sell_offers",
    nft_id: nftID
  })

  const offerID = offers.result.offers[0].nft_offer_index

  console.log("Offer ID:", offerID)

  /* -------------------------
     5. BUY NFT
  ------------------------- */

  const acceptTx = {
    TransactionType: "NFTokenAcceptOffer",
    Account: buyer.address,
    NFTokenSellOffer: offerID
  }

  const acceptPrepared = await client.autofill(acceptTx)
  const acceptSigned = buyer.sign(acceptPrepared)

  const buyResult = await client.submitAndWait(acceptSigned.tx_blob)

  console.log("NFT purchased!")

  await client.disconnect()
}

nftMarketplaceDemo()

