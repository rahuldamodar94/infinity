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

var balance = function(address) {

    axios({
        method: 'get',
        url: 'https://chain.so/api/v2/get_address_balance/LTCTEST/' + address + '/0',
    }).then(function(response) {
        console.log(response.data.data);
    }).catch(err => {
        console.log(err)
    })
}

balance('n19ThvXhrTSQ9cRaX4dFq9q1viWgBc9qUx');

var create = async function(pvt_key, account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8001/importpvtkey/' + pvt_key + '-' + account_name,
    })

    return res;

}

// create('cTrNRHEJ3zm7AzkF2aC7JpuMAT7wrSsM6i8zk5m6MFnpfivFACkq','rahulinfi123').then(res => {
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

send('rahulinfi123','mkv1b46Te86xv145cGT3QnLS1UYLkmHu1y','0.01').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})


var importPvtKey = function(secret_key) {

    var address = new litecore.PrivateKey(secret_key).toAddress();
    console.log(address.toString())
}


// importPvtKey('T4w1z71fSEUUA6fX4kdMpsnisPd3ZPcBnRQp7oMacSUxuMzN1n9L');

var isValid = function(address) {
    console.log(litecore.Address.isValid(address, litecore.Networks.testnet))
}

// isValid('mov7DjGJBFgRH6naJQDdEsLyEMWaKsnFWF');