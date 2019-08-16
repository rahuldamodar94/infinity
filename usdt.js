var axios = require('axios');
const bip39 = require('bip39')
var bitcore = require('bitcore-lib');


var generate = function() {

    bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
    const mnemonic = bip39.generateMnemonic()
    var value = Buffer.from(mnemonic);
    var hash = bitcore.crypto.Hash.sha256(value);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var address = new bitcore.PrivateKey(bn).toAddress();
    var pvtkey = new bitcore.PrivateKey(bn);
    var pubkey = new bitcore.PublicKey(pvtkey);
    var address_final = new bitcore.Address(pubkey);
    console.log(address_final.toString());
    console.log(pvtkey.toWIF());
}

// generate();

var balance = async function(address) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.3.239:8003/getusdtbalance/' + address,
    })

    return res.data.output.result.balance;
    
}

// balance('mpKR47iJECdPKffWRxdiSBLA4Y1gKTtcTC').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })
var checkStatus = async function(txHash) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.3.239:8004/gettransaction/' + txHash,
    })

    return (res.data);

}

// checkStatus('fcf6b36aded0aadea83eb4435008a0cfa2ef9a9b6316b4aa1e3c36bd16f1c9e5').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

var create = async function(pvt_key, account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.3.239:8001/importpvtkey/' + pvt_key + '-' + account_name,
    })

    return res;

}

// create('Ky6hcwWb8UZw5PBWyA3JdPR4hNLTJS54bsTTrR4xLVjsYHrzR7Vs','16Q4J11Uq6fi8taTthUfas879Uwdoqeezx').then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })

var send = async function(from_address, to_address, amount) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.3.239:8000/sendusdtcoin/' + from_address + '-' + to_address + '-' + amount,
    })

    return res;

}

// send('mziK54h45SkxL2UGHQ7mUQVM7QQ51RmWP5', '921Xy8dB8iK4mHJFist9Whciz2MSXmMAPkDRJUx9Ad13wTGeFw4', 'mkv1b46Te86xv145cGT3QnLS1UYLkmHu1y', '0.000001').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

var importPvtKey = function(secret_key) {

    var address = new bitcore.PrivateKey(secret_key).toAddress();
    console.log(address.toString())
}

// importPvtKey('cPTh5rWSZYGCEpenMZrRzhv8KbdrxtAkfubvxqXTqcPso2zDs1L3');


var isValid = function(address) {
    console.log(bitcore.Address.isValid(address, bitcore.Networks.testnet))
}

// isValid('mftEkAxpiGYuWpgqT58Lqm5y4yMzFrdTgY');