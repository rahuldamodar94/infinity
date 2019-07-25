var Stellar = require('stellar-sdk');
var rp = require('request-promise');
// StellarBase.Network.usePublicNetwork(); if this transaction is for the public network
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
Stellar.Network.useTestNetwork()

let pairA = Stellar.Keypair.random()
let pairB = Stellar.Keypair.random()

console.log('apub',pairA.publicKey())
console.log('asec',pairA.secret())
console.log('bpub',pairB.publicKey())

var accountA;
var accountB;

var test = async function() {
    await rp.get({
        uri: 'https://horizon-testnet.stellar.org/friendbot',
        qs: { addr: pairA.publicKey() },
        json: true
    })

    accountA = await server.loadAccount(pairA.publicKey())

    accountA.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}

var test2 = async function() {
    await rp.get({
        uri: 'https://horizon-testnet.stellar.org/friendbot',
        qs: { addr: pairB.publicKey() },
        json: true
    })

    accountB = await server.loadAccount(pairB.publicKey())

    accountB.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}

test().then(res => {
    return test2();
}).then(res => {
    console.log('successs');
}).catch(err => {
    console.log(err);
})