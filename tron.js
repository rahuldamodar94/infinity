const bip39 = require('bip39');
const hdkey = require('hdkey');
let { HdTronPayments } = require('@faast/tron-payments')

let tronAddressGenerate = async function() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/195'/0'/0/0");
    let tronPayments = new HdTronPayments({ hdKey: (addrNode.toJSON()).xpriv })
    let depositAddress = await tronPayments.getAddress(0)
    let privateKey = await tronPayments.getPrivateKey(0)
    console.log(depositAddress)
    return mnemonic;
}

let tronAddressRetrieve = async function(mnemonic) {
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/195'/0'/0/0");
    let tronPayments = new HdTronPayments({ hdKey: (addrNode.toJSON()).xpriv })
    let depositAddress = await tronPayments.getAddress(0)
    let privateKey = await tronPayments.getPrivateKey(0)
    return privateKey;
}

// tronAddressGenerate().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err.message)
// })

// tronAddressRetrieve('ancient banana stick tribe rate dignity visual annual bamboo goddess alpha glide').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err.message)
// })