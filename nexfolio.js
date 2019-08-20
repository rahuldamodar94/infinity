const Binance = require('binance-api-node').default
const cron = require('node-cron');
const client = Binance()

cron.schedule('*/1 * * * * *', async function() {

    client.candles({ symbol: 'BTCUSDT', interval: '1m' }).then(res => {
        let last_tick = res[res.length - 1];
        console.log('close',last_tick.close);
    }).catch(err => {
        console.log(err);
    })

});