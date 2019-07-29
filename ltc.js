var axios = require('axios');
var wif = require('wif');
var litecore = require('litecore-lib')
var balance = function(address) {

    axios({
        method: 'get',
        url: 'https://api.blockcypher.com/v1/ltc/main/addrs/' + address + '/balance',
    }).then(function(response) {
        console.log(response.data.final_balance / 100000000);
    }).catch(err => {
        console.log(err)
    })
}

// balance('LhrhMLbLemDnhyqdu4ia2uT98vAHMWwUSm');

var create = async function() {


    var value = new Buffer.from('muffin limit tell among avoid salon victory purchase enact exercise scout hammer');
    var hash = litecore.crypto.Hash.sha256(value);
    // let pvt_key = wif.encode(128, hash, false);

    let pvt_key = wif.encode(128, hash, false);
    axios({
        method: 'post',
        url: 'http://128.199.44.148:8001/importpvtkey/' + pvt_key + '-testing',
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.message)
    })

}

var privateKey = new litecore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
console.log(privateKey)
// create().then(res => {
// 	console.log('success');
// }).catch(err => {
// 	console.log(err);
// })