// const hdkey = require('hdkey')
// const wif = require('wif')
// const ecc = require('eosjs-ecc')
// const bip39 = require('bip39')
// // const mnemonic = 'real flame win provide layer trigger soda erode upset rate beef wrist fame design merit'
// const mnemonic = bip39.generateMnemonic()
// const seed = bip39.mnemonicToSeedHex(mnemonic)
// const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
// const node = master.derive("m/44'/194'/0'/0/0")
// console.log("publicKey: "+ecc.PublicKey(node._publicKey).toString())
// console.log("privateKey: "+wif.encode(128, node._privateKey, false))

const fetch = require('node-fetch');
const { JsonRpc } = require('eosjs');

// Instantiate a new JsonRpc object, with the Network Api Uri, and a request object
const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });
// Request the balance, passing in the token contract, the account name, and the token symbol
rpc.get_currency_balance('eosio.token', 'eospaceioeos', 'EOS').then((balance) => console.log(balance));