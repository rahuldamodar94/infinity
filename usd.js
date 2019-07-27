var coinMarketCapKey = 'd0c9d885-8f21-4964-93d5-115af3bacf63';


var getRate = async function(convert_to) {
    try {

        const rp = require('request-promise');
        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
                'start': '1',
                'limit': '20',
                'convert': convert_to
            },
            headers: {
                'X-CMC_PRO_API_KEY': coinMarketCapKey,
            },
            json: true,
            gzip: true
        };

        var result = {
            BTC: '',
            LTC: '',
            ETH: '',
            XRP: '',
            EOS: '',
            XLM: '',
            TRX: '',
            BTC: '',
        };

        var response = await rp(requestOptions);
        var detailsArray = response.data;



        for (detail of detailsArray) {
            switch (detail.symbol) {
                case 'BTC':
                    result['BTC'] = detail.quote[convert_to].price;
                    break;
                case 'LTC':
                    result['LTC'] = detail.quote[convert_to].price;
                    break;
                case 'ETH':
                    result['ETH'] = detail.quote[convert_to].price;
                    break;
                case 'XRP':
                    result['XRP'] = detail.quote[convert_to].price;
                    break;
                case 'EOS':
                    result['EOS'] = detail.quote[convert_to].price;
                    break;
                case 'XLM':
                    result['XLM'] = detail.quote[convert_to].price;
                    break;
                case 'TRX':
                    result['TRX'] = detail.quote[convert_to].price;
                    break;
            }
        }

        return (result);
    } catch (err) {
        console.log(err.message)
    }

}

// getRate('USDT');
getRate('USD').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err.message)
})