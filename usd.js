var coinMarketCapKey = 'd0c9d885-8f21-4964-93d5-115af3bacf63';


var getRate = function(convert_to) {
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

    rp(requestOptions).then(async response => {
        var detailsArray = response.data;

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

        console.log(result);
    }).catch((err) => {
        console.log('API call error:', err.message);
    });

}

// getRate('USDT');
getRate('USD');