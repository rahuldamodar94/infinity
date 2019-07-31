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

// balance('mziK54h45SkxL2UGHQ7mUQVM7QQ51RmWP5');


var create = async function(pvt_key, account_name) {

    let res = await axios({
        method: 'get',
        url: 'http://68.183.13.235:8001/importpvtkey/' + pvt_key + '-' + account_name,
    })

    return res;

}

// create('cPTh5rWSZYGCEpenMZrRzhv8KbdrxtAkfubvxqXTqcPso2zDs1L3','vijay').then(res => {
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

// send('mziK54h45SkxL2UGHQ7mUQVM7QQ51RmWP5', '921Xy8dB8iK4mHJFist9Whciz2MSXmMAPkDRJUx9Ad13wTGeFw4', 'mkv1b46Te86xv145cGT3QnLS1UYLkmHu1y', '0.000001').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// send('mkv1b46Te86xv145cGT3QnLS1UYLkmHu1y', 'cPTh5rWSZYGCEpenMZrRzhv8KbdrxtAkfubvxqXTqcPso2zDs1L3', 'mziK54h45SkxL2UGHQ7mUQVM7QQ51RmWP5', '0.0001').then(res => {
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