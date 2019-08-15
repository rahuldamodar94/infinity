const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
})

var WAValidator = require('multicoin-address-validator');


var getBalance = async function(address, tokenId) {

    let response = await tronWeb.trx.getAccount(address);

    var balance = 0;
    var tokensArray = response.assetV2;
    if (!tokensArray) {
        return null;
    }
    for (token of tokensArray) {
        if (token.key === tokenId) {
            balance = (token.value);
        }
    }

    return balance;
}

// getBalance('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV', '1000137').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })


var send = async function(address, amount, pvt_key, tokenId) {
    let response = await tronWeb.trx.sendToken(address, parseInt(amount), tokenId, pvt_key);
    return response;
}

// send('TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2','3000','F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1','1000137').then(res => {
//  console.log(res);
// }).catch(err => {
//  console.log(err);
// })

var isValid = function(address) {
    var valid = WAValidator.validate(address, 'TRX');
    if (valid) {
        return true;
    } else {
        return false;
    }
}

// console.log(isValid('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV'));

var importPvtKey = function(pvt_key) {
    console.log(tronWeb.address.fromPrivateKey(pvt_key));
}

// importPvtKey('F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1');

var checkStatus = async function(txhash) {
    let res = await tronWeb.trx.getTransaction(txhash);
    return (res.ret[0].contractRet === 'SUCCESS');
}

// checkStatus('af53d96cb3c68bda00e7a3b2749a327fe475b0d47c54facce237abb25a595073').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })