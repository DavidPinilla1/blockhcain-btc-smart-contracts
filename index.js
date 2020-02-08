const fs=require('fs');
const bcoin =require('bcoin');

const KeyRing =bcoin.wallet.WalletKey;
const Script= bcoin.Script;


// create 2 private keys
const keypair1 =KeyRing.generate(true,'regtest');
const keypair2 =KeyRing.generate(true,'regtest');

fs.writeFileSync('regtest-key1.wif',keypair1.toSecret('regtest'));
fs.writeFileSync('regtest-key2.wif',keypair2.toSecret('regtest'));

const m = 2;
const n = 2;

const publicKeys =[keypair1.publicKey,keypair2.publicKey]

const multiSigScript =Script.fromMultisig(m, n, publicKeys);

const address =multiSigScript.getAddress().toBase58();
