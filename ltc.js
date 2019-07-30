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
        url: 'https://api.blockcypher.com/v1/ltc/main/addrs/' + address + '/balance',
    }).then(function(response) {
        console.log(response.data.final_balance / 100000000);
    }).catch(err => {
        console.log(err)
    })
}

// balance('LhrhMLbLemDnhyqdu4ia2uT98vAHMWwUSm');

var create = async function(pvt_key) {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8001/importpvtkey/' + pvt_key + '-rahuww123',
    })

    return res;

}

// create('cNzG1uxzk2F6y4z4yXHd3yUJDMt6csfmbmwmPKGiouMHsqSu9UnL').then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(err);
// })


var send = async function() {

    let res = await axios({
        method: 'get',
        url: 'http://128.199.44.148:8000/sendlitecoin/mi8aCuWS7stcLeGvUTtEKiaFXdTUArP1fD-mni6Zv4UcohS7VAZyw696MBD3ra5HNCBoE-0.1',
    })

    return res;

}

// send().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })