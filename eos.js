const hdkey = require('hdkey')
const wif = require('wif')
const ecc = require('eosjs-ecc')
const bip39 = require('bip39')

EosApi = require('eosjs-api')
var WAValidator = require('multicoin-address-validator');


options = {
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    verbose: false,
    fetchConfiguration: {}
}

eos = EosApi(options)

var accountValid = async function(account_name) {
    try {
        let res = await eos.getAccount(account_name);
        if (res) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

// accountValid('rahultest321').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const { TextEncoder, TextDecoder } = require('util');

var generate = function() {
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

// balance('rahultest421').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

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

// create('prabhatest12','EOS5PuPjDR3pzTpRYjzo8t69YPTibwuQCmPZL5pQViUN3FQtCBAAn').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })


// Public Key: EOS6NcGnaWxRB9yRb7eVKMAV1hqDH3qkVNatS9yQuMjdHTokh51An 
// Private key: 5Kem2ZpN9juwULfSh2A3LTxXie6mpQoN9i1WmfLWao8nojSFMS2
// send('rahultest421', 'prabhatest12', '5Kem2ZpN9juwULfSh2A3LTxXie6mpQoN9i1WmfLWao8nojSFMS2', '10').then(res => {
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


var isValid = function(address) {
    var valid = WAValidator.validate(address, 'EOS');
    if (valid) {
        return true;
    } else {
        return false;
    }
}

// console.log(isValid('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV'));

var importPvtKey = function(pvt_key) {
    console.log(ecc.privateToPublic(pvt_key));
}

// importPvtKey('5JZC2hp6EdZwPvTTbA6jiYbrGWD1GXGBPNynUcdLsjkVHvW9cVR');