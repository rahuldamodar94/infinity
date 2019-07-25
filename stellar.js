

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

let pairA = Stellar.Keypair.random()
let pairB = Stellar.Keypair.random()

// console.log('apub',pairA.publicKey())
// console.log('asec',pairA.secret())
// console.log('bpub',pairB.publicKey())

var balance = async function(publicKey) {

    var accountB = await server.loadAccount(publicKey);

    accountB.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}



var send = async function(source_pvt_key, destination_public_addr) {

const sourceSecretKey = source_pvt_key;

const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeypair.publicKey();

const receiverPublicKey = destination_public_addr;

const account = await server.loadAccount(sourcePublicKey);


const fee = await server.fetchBaseFee();

const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    .addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: '350.1234567',
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