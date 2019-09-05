const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: 'F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1'
})

async function balance(address) {
    let contractInstance = await tronWeb.contract().at('TTvszWPrPvBMa5ybqr6JvBzwiB7MGLhz6n');

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

async function send(to, amount) {
    let contractInstance = await tronWeb.contract().at('TTvszWPrPvBMa5ybqr6JvBzwiB7MGLhz6n');

    let args = {
        callValue: 0,
        fee: 100,
        shouldPollResponse: true
    }

    let result = await contractInstance.transfer(to, amount).send();

    return result;
}

// send('TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2', '3000000').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })