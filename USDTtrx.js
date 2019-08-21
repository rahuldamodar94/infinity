const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: 'F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1'
})

async function balance(address) {
    let contractInstance = await tronWeb.contract().at('TNFHQFDf6o3hKTsMvoE19ZMNRepS5rUttr');

    let args = {
        callValue: 0,
        shouldPollResponse: true
    }
    let result = await contractInstance.balanceOf(address).call(args);

    return result / 1000000;
}

// balance('TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2').then(res => {
//     console.log(res.toString());
// }).catch(err => {
//     console.log(err);
// })

async function send(address, amount) {
    let contractInstance = await tronWeb.contract().at('TNFHQFDf6o3hKTsMvoE19ZMNRepS5rUttr');

    let args = {
        callValue: 0,
        shouldPollResponse: true
    }
    let result = await contractInstance.transfer(address, amount).send(args);

    return result;
}

// send('TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2', '100000000').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })