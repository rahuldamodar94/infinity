const hdkey = require('hdkey')
const wif = require('wif')
const ecc = require('eosjs-ecc')
const bip39 = require('bip39')

EosApi = require('eosjs-api')

options = {
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    verbose: false,
    fetchConfiguration: {}
}

eos = EosApi(options)

const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const { TextEncoder, TextDecoder } = require('util');

var generate = async function() {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedHex(mnemonic)
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
    const node = master.derive("m/44'/2'/0'/0/0")
    console.log("publicKey: " + ecc.PublicKey(node._publicKey).toString())
    console.log("privateKey: " + wif.encode(128, node._privateKey, false))
}

var create = async function(account_name, address) {

    var privateKeys = ['5JZC2hp6EdZwPvTTbA6jiYbrGWD1GXGBPNynUcdLsjkVHvW9cVR'];

    var signatureProvider = new JsSignatureProvider(privateKeys);

    var fetch = require('node-fetch');


    var rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });

    var api = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
    });
    api.transact({
        actions: [{
                account: 'eosio',
                name: 'newaccount',
                authorization: [{
                    actor: 'rahultest321',
                    permission: 'active',
                }, ],
                data: {
                    creator: 'rahultest321',
                    name: account_name,
                    owner: {
                        threshold: 1,
                        keys: [{
                            key: address,
                            weight: 1,
                        }, ],
                        accounts: [],
                        waits: [],
                    },
                    active: {
                        threshold: 1,
                        keys: [{
                            key: address,
                            weight: 1,
                        }, ],
                        accounts: [],
                        waits: [],
                    },
                },
            },
            {
                account: 'eosio',
                name: 'buyrambytes',
                authorization: [{
                    actor: 'rahultest321',
                    permission: 'active',
                }, ],
                data: {
                    payer: 'rahultest321',
                    receiver: account_name,
                    bytes: 8192,
                },
            },
            {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{
                    actor: 'rahultest321',
                    permission: 'active',
                }, ],
                data: {
                    from: 'rahultest321',
                    receiver: account_name,
                    stake_net_quantity: '0.0001 EOS',
                    stake_cpu_quantity: '0.0001 EOS',
                    transfer: false,
                },
            },
        ],
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    }, ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

var balance = async function(account_name) {
    let balance = await eos.getCurrencyBalance('eosio.token', account_name, 'EOS')
    return (balance);
}

var send = async function(from_account, to_account, from_pvt_key, amount) {

    var privateKeys = [from_pvt_key];

    var signatureProvider = new JsSignatureProvider(privateKeys);

    var fetch = require('node-fetch');

    var rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });

    var api = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
    });

    const result = await api.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: from_account,
                permission: 'active',
            }],
            data: {
                from: from_account,
                to: to_account,
                quantity: '' + parseFloat(amount).toFixed(4) + ' EOS',
                memo: '',
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    return (result);
}


// create('vijaytest123','EOS6mL8i176sJ1H9ZNFhkH4G4cgam1wUaBqNYvxNyUCjcZA9LGEeE').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })


// send('rahultest321', 'vijaytest123', '5JZC2hp6EdZwPvTTbA6jiYbrGWD1GXGBPNynUcdLsjkVHvW9cVR', '10').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })

// balance('userer123454').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })


// generate().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })