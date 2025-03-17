// npm i base-x@4.0.1 crypto@1.0.1

// 1. Import required algorithms: SHA-256, RIPEMD160, and base58. Set the dictionary for Base58.

//const assert = require('assert');
const crypto = require('crypto');
const R_B58_DICT = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';
const base58 = require('base-x')(R_B58_DICT);

// assert(crypto.getHashes().includes('sha256'));
// assert(crypto.getHashes().includes('ripemd160'));

// 2. Start with a 33-byte ECDSA secp256k1 public key, or a 32-byte Ed25519 public key. For Ed25519 keys, prefix the key with the byte 0xED.

const pubkey_hex = 'ED441868C001262C0EDA37E6D8066C6A0CB9914495F1AD44CC5E34946893ECDFFC';
  //'ED9434799226374926EDA3B54B1B461B4ABF7237962EAE18528FEA67595397FA32';
const pubkey = Buffer.from(pubkey_hex, 'hex');
// assert(pubkey.length == 33);

// 3. Calculate the RIPEMD160  hash of the SHA-256 hash of the public key. This value is the "Account ID".

const pubkey_inner_hash = crypto.createHash('sha256').update(pubkey);
const pubkey_outer_hash = crypto.createHash('ripemd160');
pubkey_outer_hash.update(pubkey_inner_hash.digest());
const account_id = pubkey_outer_hash.digest();

// 4. Calculate the SHA-256 hash of the SHA-256 hash of the Account ID; take the first 4 bytes. 
// This value is the "checksum".

const address_type_prefix = Buffer.from([0x00]);
const payload = Buffer.concat([address_type_prefix, account_id]);
const chksum_hash1 = crypto.createHash('sha256').update(payload).digest();
const chksum_hash2 = crypto.createHash('sha256').update(chksum_hash1).digest();
const checksum =  chksum_hash2.slice(0,4);

// 5. Concatenate the payload and the checksum. Calculate the base58 value of the concatenated buffer. 
// The result is the address.

const dataToEncode = Buffer.concat([payload, checksum]);
const address = base58.encode(dataToEncode);
// const address = Base58.encode(new Buffer.from(dataToEncode));
console.log(address);
