var Stellar = require('stellar-sdk');
var rp = require('request-promise');
// StellarBase.Network.usePublicNetwork(); if this transaction is for the public network
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
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

// test('GDW5BBLFQVWZYLDJDQFT35CIQCHQ2S2CGEX4IRAROP4DNDUBSKYSAOHL').then(res => {
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

// balance('GDW5BBLFQVWZYLDJDQFT35CIQCHQ2S2CGEX4IRAROP4DNDUBSKYSAOHL').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })


var send = async function(source_pvt_key, destination_public_addr, amount) {

    const sourceSecretKey = source_pvt_key;

    const sourceKeypair = Stellar.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const receiverPublicKey = destination_public_addr;

    const account = await server.loadAccount(sourcePublicKey);


    const fee = await server.fetchBaseFee();

    const transaction = new Stellar.TransactionBuilder(account, { fee, networkPassphrase: Stellar.Networks.TESTNET })
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

// send('SCKLY5ZKHJULHGILX7CVJAZIYPYUXA45MQPVGXWAP6OPW7FNZ5BTYDHC', 'GDEF5T5XSTHWUDIT4E3XKS3I6EEEUNTGCGENGYUJXAZ7YBHCNXB7S65Y', '1000').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })


var importPvtKey = function(pvt_key) {
    const XLMAddress = xlmProvider.createPublicKey(pvt_key);
    console.log(XLMAddress);
}

// importPvtKey('SCKLY5ZKHJULHGILX7CVJAZIYPYUXA45MQPVGXWAP6OPW7FNZ5BTYDHC');


var isValid = function(address) {
    var valid = WAValidator.validate(address, 'XLM');
    if (valid) {
        return true;
    } else {
        return false;
    }
}

// console.log(isValid('GDXI2S4CJOA5MWOUV2TIGYLG6VPB4XAVAZ5D5GK6CYEVGJHTSOR2ACHP'));

var checkStatus = async function(txHash) {

    let transactionResult = await server.transactions().transaction(txHash).call();
    return (transactionResult.successful);
}

// checkStatus('89bc2b39dcb0b763e72542ec1868e8878d48a4360392185ea5d8ab7a587186c1').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })