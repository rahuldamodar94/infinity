var Stellar = require('stellar-sdk');
var rp = require('request-promise');
// StellarBase.Network.usePublicNetwork(); if this transaction is for the public network
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
Stellar.Network.useTestNetwork()
const XlmProvider = require("xlm-provider").default;
const xlmProvider = new XlmProvider('testnet');

var WAValidator = require('multicoin-address-validator');
 
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

// test('GDQMB4E7SPDUWZEMWVJWFAFOWFXIT2PJD2BPQOLHN52XVTSABCGOGVMD').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

var balance = async function(publicKey) {

    var accountB = await server.loadAccount(publicKey);

    accountB.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
    })
}



var send = async function(source_pvt_key, destination_public_addr, amount) {

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
            amount: (parseFloat(amount)).toFixed(7),
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


var importPvtKey = function(pvt_key) {
    const XLMAddress = xlmProvider.createPublicKey(pvt_key);
    console.log(XLMAddress);
}

// importPvtKey('SAWMUQDDOLNRLDKYVK3SDJLVROL64PUALWJVEVBVZJXUK4Z2DVPBZZ75');


var isValid = function(address) {
    var valid = WAValidator.validate(address, 'XLM');
    if (valid) {
        return true;
    } else {
        return false;
    }
}

// console.log(isValid('GDXI2S4CJOA5MWOUV2TIGYLG6VPB4XAVAZ5D5GK6CYEVGJHTSOR2ACHP'));