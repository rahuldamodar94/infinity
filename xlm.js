var Stellar = require('stellar-sdk');
var rp = require('request-promise');
// StellarBase.Network.usePublicNetwork(); if this transaction is for the public network
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
Stellar.Network.useTestNetwork()

// let pairA = Stellar.Keypair.random()
// let pairB = Stellar.Keypair.random()

// console.log('apub',pairA.publicKey())
// console.log('asec',pairA.secret())
// console.log('bpub',pairB.publicKey())
// console.log('bsec',pairB.secret())

var test = async function(address) {
    await rp.get({
        uri: 'https://horizon-testnet.stellar.org/friendbot',
        qs: { addr: address },
        json: true
    })

    var accountA = await server.loadAccount(address)

    accountA.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}

var balance = async function(publicKey) {

    var accountB = await server.loadAccount(publicKey);

    accountB.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}



var send = async function(source_pvt_key, destination_public_addr,amount) {

const sourceSecretKey = source_pvt_key;

const sourceKeypair = Stellar.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeypair.publicKey();

const receiverPublicKey = destination_public_addr;

const account = await server.loadAccount(sourcePublicKey);


const fee = await server.fetchBaseFee();

const transaction = new Stellar.TransactionBuilder(account, { fee })
    .addOperation(Stellar.Operation.payment({
        destination: receiverPublicKey,
        asset: Stellar.Asset.native(),
        amount: amount.toFixed(7),
    }))
    .setTimeout(30)
    .build();

transaction.sign(sourceKeypair);

console.log(transaction.toEnvelope().toXDR('base64'));

try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log(JSON.stringify(transactionResult, null, 2));
} catch (e) {
    console.log('An error has occured:');
    console.log(e.response.data.extras.result_codes);
}
}