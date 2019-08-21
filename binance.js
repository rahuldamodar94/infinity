const Binance = require('binance-api-node').default

const client = Binance()

//BINANCES CANDLES

client.candles({ symbol: 'BTCUSDT', interval: '1d', limit: '30' }).then(res => {
    let final = [];
    for (data of res) {
        let temp = {
            high: data.high,
            low: data.low,
        }
        final.push(temp);
    }

    console.log(final);
}).catch(err => {
    console.log(err);
})


//BINANCE PRICES

// client.prices().then(res => {
//     let prices = {
//         BTC: res['XRPUSDT'],
//         LTC: res['LTCUSDT'],
//         ETH: res['ETHUSDT'],
//         XRP: res['XRPUSDT'],
//         TRX: res['TRXUSDT'],
//         EOS: res['EOSUSDT'],
//         XLM: res['XLMUSDT']
//     }

//     console.log(prices);
// }).catch(err => {
//     console.log(err);
// })