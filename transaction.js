const fs = require('fs');
const assert = require('assert');
const bcoin = require('bcoin');

const KeyRing =bcoin.wallet.WalletKey;
const {Script,MTX,Amount,Coin} = bcoin;

const privateKeys1 = fs.readFileSync('./regtest-key1.wif').toString();
const privateKeys2 = fs.readFileSync('./regtest-key1.wif').toString();

const keyPair1 =KeyRing.fromSecret(privateKeys1)
const keyPair2 =KeyRing.fromSecret(privateKeys2)

const publickey1 =keyPair1.publicKey;

const publickey2 =keyPair2.publicKey;

//Redeem Script
const redeem =Script.fromMultisig(2, 2, [publickey1,publickey2]);
// Pay to script hash (P2SH)
const script =Script.fromScripthash(redeem.hash160())

const txInfo ={
    value: Amount.fromBTC('100').toValue(),
    hash:'3b1dd17cc82e2ac43ba62bf8f1c6a0fe805df43911653d22c902571eb3a212ce',
    index:0
}
const coin =Coin.fromJSON({
    ...txInfo,
    version:1,
    height:-1,
    coinbase:false,
    script:script.toJSON(),
})
const tx =new MTX();

tx.addOutput({
    address: 'RF1PJ1VkHG6H9dwoE2k19a5aigWcWr6Lsu',
    value:Amount.fromBTC('50').toValue()
})

const changeAddress =script.getAddress().toBase58('regtest');
tx.addOutput({
    address: changeAddress,
    value:Amount.fromBTC('49.99').toValue()

})
tx.addCoin(coin);

keyPair1.script =redeem
keyPair2.script =redeem

tx.scriptInput(0,coin,keyPair1);
tx.signInput(0,coin,keyPair1);
tx.signInput(0,coin,keyPair2);