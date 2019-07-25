var Stellar = require('stellar-sdk');
var rp = require('request-promise');
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
Stellar.Network.useTestNetwork()

let pairA = Stellar.Keypair.random()
let pairB = Stellar.Keypair.random()


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

test().then(res => {
	console.log('success')
}).catch(err => {
	console.log(err);
})


// await rp.get({
//   uri: 'https://horizon-testnet.stellar.org/friendbot',
//   qs: { addr: pairB.publicKey() },
//   json: true
// })

// accountB = await server.loadAccount(pairB.publicKey())

// accountB.balances.forEach((balance) => {
//   console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
// })