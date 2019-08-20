const Binance = require('binance-api-node').default

const client = Binance()


client.candles({ symbol: 'LTCUSDT', interval: '1M' }).then(res => {
    let last_tick = res[res.length - 1];
    console.log(last_tick);
}).catch(err => {
    console.log(err);
})