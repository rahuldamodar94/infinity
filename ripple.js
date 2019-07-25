const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib')

mnemonic = bip39.generateMnemonic()

console.log('mnemonic: ' + mnemonic)
const seed = bip39.mnemonicToSeed('stage between scorpion joke dwarf spice street gown rose moral luggage escape')
const m = bip32.fromSeedBuffer(seed)
const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2))

console.log('privateKey: ' + keyPair.privateKey)
console.log('privateKeyWif: ' + key.to_pri_string()) // to_wif
console.log('publicKey: ' + keyPair.publicKey)
console.log('address: ' + key.to_address_string())