const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: 'F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1'
})

async function getContract() {
    let res = await tronWeb.contract().at("TVPGpHt8GvpMSqpdhjKcXq6ehtEACiUq8Z");
    return (res);
}

// getContract().then(res => {
//  console.log(res)
// })


async function triggercontract() {
    let contractInstance = await tronWeb.contract().at('TVPGpHt8GvpMSqpdhjKcXq6ehtEACiUq8Z');

    let args = {
        callValue: 0,
        shouldPollResponse: true
    }
    let result = await contractInstance.getDetails('0xdc2a3f3e0f35b8edfdd2feaebe4531e694c84cc30d059e9cfdd99b5dba130e65').call(args);

    return result;
}

// triggercontract().then(res => {
//     // console.log(res);
//     let data = {
//         expiry_days: res[0].toString(),
//         coin: res[1],
//         stable_coin: res[2],
//         coin_amount: res[3],
//         stable_coin_amount: res[4],
//         strike_rate: res[5],
//         premium: res[6],
//     }

//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

async function triggercontract3() {
    let contractInstance = await tronWeb.contract().at('TVPGpHt8GvpMSqpdhjKcXq6ehtEACiUq8Z');

    let args = {
        callValue: 0,
        shouldPollResponse: true
    }
    let result = await contractInstance.getOrderDetails('0xdc2a3f3e0f35b8edfdd2feaebe4531e694c84cc30d059e9cfdd99b5dba130e65').call(args);

    return result;
}

// triggercontract3().then(res => {
//     // console.log(res);
//     let data = {
//         status: res[0].toString(),
//         created_at: res[1].toString(),
//         buyer_address: res[2],
//         seller_address: res[3],
//         order_type: res[4],
//     }

//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })


async function triggercontract2() {
    let contractInstance = await tronWeb.contract().at('TVPGpHt8GvpMSqpdhjKcXq6ehtEACiUq8Z');

    let args = {
        callValue: 0,
        shouldPollResponse: true
    }
    let result = await contractInstance.create('2', '30', '3', '3433', 'USDT', 'BTC', '0.2334', '0.5', '0.1', '10', '56', 'TEwbscPMyadgq5oAK7NsdPQTXBSUtLnnwf', 'TEwbscPMyadgq5oAK7NsdPQTXBSUtLnnwf', 'SELL').send(args);

    return result;
}

triggercontract2().then(res => {
 console.log(res);
}).catch(err => {
 console.log(err);
})