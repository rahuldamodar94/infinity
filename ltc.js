var axios = require('axios');


var balance = function(address) {

    axios({
        method: 'get',
        url: 'https://api.blockcypher.com/v1/ltc/main/addrs/' + address + '/balance',
    }).then(function(response) {
        console.log(response.data.final_balance/100000000);
    }).catch(err => {
        console.log(err)
    })
}

balance('LhrhMLbLemDnhyqdu4ia2uT98vAHMWwUSm');