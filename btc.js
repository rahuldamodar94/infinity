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

var balance = function(address) {

    axios({
        method: 'get',
        url: 'https://api.blockcypher.com/v1/btc/test3/addrs/' + address + '/balance',
    }).then(function(response) {
        console.log(response.data.balance / 100000000);
    }).catch(err => {
        console.log(err)
    })
}

// balance('2N5ga4sbehH128PWp6nbQaBoxDisQvjaWVU');


var create = async function(pvt_key, account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.13.235:8001/importpvtkey/' + pvt_key + '-' + account_name,
    })

    return res;

}

// create('cNzG1uxzk2F6y4z4yXHd3yUJDMt6csfmbmwmPKGiouMHsqSu9UnL').then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })

var send = async function(from_address, from_pvt_key, to_address, amount) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.13.235:8002/sendbtc/' + from_address + '-' + from_pvt_key + '-' + to_address + '-' + amount,
    })

    return res;

}

send('2N5ga4sbehH128PWp6nbQaBoxDisQvjaWVU', 'cQ2xV7xbjbRHuq7J6iKRvFN11KRYoNtokeKU8FqXxF8sqWRXUCxd', 'mziK54h45SkxL2UGHQ7mUQVM7QQ51RmWP5', '0.0001').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})


var importPvtKey = function(secret_key) {

    var address = new bitcore.PrivateKey(secret_key).toAddress();
    console.log(address.toString())
}

// importPvtKey('KxufKKPrqiU6jp9wvNPQgLbZTBzFMqTQVCFBFx7BLWrkexmMF264');


var isValid = function(address) {
    console.log(bitcore.Address.isValid(address, bitcore.Networks.testnet))
}

// isValid('mftEkAxpiGYuWpgqT58Lqm5y4yMzFrdTgY');