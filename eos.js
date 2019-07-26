const hdkey = require('hdkey')
const wif = require('wif')
const ecc = require('eosjs-ecc')
const bip39 = require('bip39')
// const mnemonic = 'real flame win provide layer trigger soda erode upset rate beef wrist fame design merit'
const mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedHex(mnemonic)
const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
const node = master.derive("m/44'/194'/0'/0/0")
console.log("publicKey: "+ecc.PublicKey(node._publicKey).toString())
console.log("privateKey: "+wif.encode(128, node._privateKey, false))

// const fetch = require('node-fetch');
// const { JsonRpc } = require('eosjs');

//eospaceioeos

// var balance = fucntion(account_name) {
//     // Instantiate a new JsonRpc object, with the Network Api Uri, and a request object
//     const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });
//     // Request the balance, passing in the token contract, the account name, and the token symbol
//     rpc.get_currency_balance('eosio.token', account_name, 'EOS').then((balance) => console.log(balance));
// }



// EosApi = require('eosjs-api') // Or EosApi = require('./src')

// // everything is optional
// options = {
//     httpEndpoint: 'https://jungle2.cryptolions.io:443', // default, null for cold-storage
//     verbose: false, // API logging
//     fetchConfiguration: {}
// }

// eos = EosApi(options)

// eos.getCurrencyBalance('eosio.token', 'rahultest321', 'EOS').then((balance) => console.log(balance));

// const { Api, JsonRpc } = require ('eosjs');
// const { JsSignatureProvider } = require ('eosjs/dist/eosjs-jssig');  // development only

// const privateKeys = '5K3fgCjoFtswqCWjGwNuorKEDPJWRPowi5MasDZM68eZiiUvwNY';

// const signatureProvider = new JsSignatureProvider(privateKeys);
// const rpc = new JsonRpc('https://api.eosnewyork.io');
// const api = new Api({ rpc, signatureProvider })

// api.transact({
//   actions: [{
//     account: 'eosio',
//     name: 'newaccount',
//     authorization: [{
//       actor: 'infinity1ope',
//       permission: 'active',
//     }],
//     data: {
//       creator: 'infinity1ope',
//       name: 'rahultest123',
//       owner: {
//         threshold: 1,
//         keys: [{
//           key: 'EOS5WuVDqf5ujn2XNbGktPv2bczekP4Px8ZXwcoJGNrtbVUvv5vCK',
//           weight: 1
//         }],
//         accounts: [],
//         waits: []
//       },
//       active: {
//         threshold: 1,
//         keys: [{
//           key: 'EOS5WuVDqf5ujn2XNbGktPv2bczekP4Px8ZXwcoJGNrtbVUvv5vCK',
//           weight: 1
//         }],
//         accounts: [],
//         waits: []
//       },
//     },
//   }]
// }, {
//   blocksBehind: 3,
//   expireSeconds: 30,
// }).then(res => {
// 	console.log(res);
// }).catch(err => {
// 	console.log(err)
// })