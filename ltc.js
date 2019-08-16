var axios = require('axios');
const bip39 = require('bip39')
var litecore = require('litecore-lib');


var generate = function() {

    litecore.Networks.defaultNetwork = litecore.Networks.testnet;
    const mnemonic = bip39.generateMnemonic()
    var value = Buffer.from(mnemonic);
    var hash = litecore.crypto.Hash.sha256(value);
    var bn = litecore.crypto.BN.fromBuffer(hash);
    var address = new litecore.PrivateKey(bn).toAddress();
    var pvtkey = new litecore.PrivateKey(bn);
    var pubkey = new litecore.PublicKey(pvtkey);
    var address_final = new litecore.Address(pubkey);
    console.log(address_final.toString());
    console.log(pvtkey.toWIF());
}

// generate();

var balance = async function(account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8003/getbalance/' + account_name,
    })

    return res.data;
}

var checkStatus = async function(txHash) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8004/gettransaction/' + txHash,
    })

    return (res.data.output.result.confirmations > 6);

}

// checkStatus('89282fb43ba0f70d1acde7a8d689822d22755c2724bf34306cda5e54ae0fa15a').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// balance('msMDdbv9CH43R2oZZoyuAR1utZv2nmivgb').then(res => {
//     console.log(JSON.parse(res.output).result)
// }).catch(err => {
//     console.log(err)
// })

var create = async function(pvt_key, account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8001/importpvtkey/' + pvt_key + '-' + account_name,
    })

    return res;

}

// create('cSiccB6RpcJM4KhaEtdb8RgqGHjdwDsTe8WsM9zEkNu2j4iPmFGX','msMDdbv9CH43R2oZZoyuAR1utZv2nmivgb').then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })


var send = async function(account_name, to_address, amount) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8000/sendlitecoin/' + account_name + '-' + to_address + '-' + amount,
    })

    return res;

}

// send('rahul@nextazy.com','mvtsZApH7az7JFaEAawaBrjTMnysHATLbM','0.001').then(res => {
//     let response = JSON.parse(res.data.address);
//     console.log(response);
// }).catch(err => {
//     console.log(err);
// })


var importPvtKey = function(secret_key) {

    var address = new litecore.PrivateKey(secret_key).toAddress();
    console.log(address.toString())
}

// n19ThvXhrTSQ9cRaX4dFq9q1viWgBc9qUx
// importPvtKey('cTrNRHEJ3zm7AzkF2aC7JpuMAT7wrSsM6i8zk5m6MFnpfivFACkq');

var isValid = function(address) {
    console.log(litecore.Address.isValid(address, litecore.Networks.testnet))
}

// isValid('n19ThvXhrTSQ9cRaX4dFq9q1viWgBc9qUx');