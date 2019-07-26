const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const { TextEncoder, TextDecoder } = require('util');
const privateKeys = ['5JZC2hp6EdZwPvTTbA6jiYbrGWD1GXGBPNynUcdLsjkVHvW9cVR'];

const signatureProvider = new JsSignatureProvider(privateKeys);

const fetch = require('node-fetch');
const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });

const api = new Api({
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
                name: 'rahultest124',
                owner: {
                    threshold: 1,
                    keys: [{
                        key: 'EOS6tqnefswUt72tqrgHU15U6n1539Zd1wSaxvJrErqVN9oX5rGgU',
                        weight: 1,
                    }, ],
                    accounts: [],
                    waits: [],
                },
                active: {
                    threshold: 1,
                    keys: [{
                        key: 'EOS6tqnefswUt72tqrgHU15U6n1539Zd1wSaxvJrErqVN9oX5rGgU',
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
                receiver: 'rahultest124',
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
                receiver: 'rahultest124',
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