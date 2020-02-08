const fs = require('fs');
const assert = require('assert');
const bcoin = require('bcoin');

const KeyRing =bcoin.wallet.WalletKey;
const {Script,MTX,Amount,Coin} = bcoin.MTX;

const privateKeys1 = fs.readFileSync('./regtest-key1.wif').toString();
const privateKeys2 = fs.readFileSync('./regtest-key1.wif').toString();

const keyPair1 =KeyRing.fromSecret(privateKeys1)
const keyPair2 =KeyRing.fromSecret(privateKeys2)

const publickey1 =keyPair1.publicKey;

const publickey2 =keyPair2.publicKey;
const m = 2;
const n = 2;

//Redeem Script
const redeem =Script.fromMultisig(m, n, [publickey1,publickey2]);
// Pay to script hash (P2SH)
const script =Script.fromScripthash(redeem.hash160())
console.log(script);

