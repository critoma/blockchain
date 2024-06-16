// npm i ripple-lib@1.10.1
// ism_ase_ro@cloudshell:~/blockchain/xrp$ npm ls
// xrp@ /home/ism_ase_ro/blockchain/xrp
// └── ripple-lib@1.10.1
// https://xrpl.org/accounts.html

'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

// ///// - npm i ripple-lib
// 
// XRPL Dev Links:
// Public Git: https://github.com/ripple
// Decentralized cryptocurrency blockchain daemon implementing the XRP Ledger in C++: 
// https://github.com/ripple/rippled
// A JavaScript API for interacting with the XRP Ledger in Node.js and the browser:
// https://github.com/ripple/ripple-lib
// Get started:
// https://xrpl.org/get-started-with-rippleapi-for-javascript.html | https://xrpl.org/tutorials.html
// XRP Faucets: https://xrpl.org/xrp-testnet-faucet.html | https://xrpl.org/dev-tools.html 
// Explorers: 
//  Real Ledger in real time: https://livenet.xrpl.org/
//  Testnet / Devnet Ledger in real time: https://testnet.xrpl.org | https://devnet.xrpl.org 
// Docs: https://xrpl.org/docs.html
// https://xrpl.org/monitor-incoming-payments-with-websocket.html
// https://xrpl.org/rippled-api.html | https://xrpl.org/ledger-data-formats.html
// https://piyopiyo.medium.com/how-to-send-ripple-xrp-with-javascript-9385c51fef00
// 


const api = new RippleAPI({
  server: 'wss://s1.ripple.com' // Public rippled real server
});
// const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net'}) //TESTNET

//const api = new RippleAPI({server: 'wss://s.devnet.rippletest.net'}) //:51233 DEVNET

  //const myAddress = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn'; // DEMO - not mine
  const myAddress = 'rJmMuvTUMgGwzCwgufVgkDXNVP5pQu4Xnc';   // Real XRP ADDRESS
  // const myAddress = 'rLeDvLQRFeMnjVFHQP9Zvdy38gz46iubaT'; // My TEST Net 1
  //const myAddress = 'rwBjn3CL3iAyz68Y8F5UQ9Dbwaob5HMS8x'; // My TEST Net 2
  
  // const myAddress = 'rKyGku4sDHcM2e6pzahkGtfn1qoqb5FMqX'; // My DEV Net 1
  // const myAddress = 'rMoD3Y7N8tukZ7qLZtbXQtoeFAhsxZXMgx'; // My DEV Net 2

api.connect().then(() => {
  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);
}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);

