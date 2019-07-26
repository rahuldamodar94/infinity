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

(async () => {
    const result = await api.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: 'rahultest321',
                permission: 'active',
            }],
            data: {
                from: 'rahultest321',
                to: 'rahultest123',
                quantity: '5.0000 EOS',
                memo: '',
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    console.log(result);
})();