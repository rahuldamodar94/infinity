const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
})

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


var send = async function(address,amount,pvt_key,tokenId) {
    let response = await tronWeb.trx.sendToken(address, parseInt(amount), tokenId, pvt_key);
    return response;
}

// send('TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2','3000','F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1','1000137').then(res => {
// 	console.log(res);
// }).catch(err => {
// 	console.log(err);
// })