const Binance = require('binance-api-node').default

const client = Binance()

//BINANCES CANDLES

client.candles({ symbol: 'LTCUSDT', interval: '1M' }).then(res => {
    let last_tick = res[res.length - 1];
    console.log(last_tick);
}).catch(err => {
    console.log(err);
})


//BINANCE PRICES

client.prices().then(res => {
    let prices = {
        BTC: res['XRPUSDT'],
        LTC: res['LTCUSDT'],
        ETH: res['ETHUSDT'],
        XRP: res['XRPUSDT'],
        TRX: res['TRXUSDT'],
        EOS: res['EOSUSDT'],
        XLM: res['XLMUSDT']
    }

    console.log(prices);
}).catch(err => {
    console.log(err);
})