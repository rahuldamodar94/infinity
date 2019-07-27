var axios = require('axios');

var balance = function(address) {

    axios({
        method: 'get',
        url: 'https://api.blockcypher.com/v1/btc/main/addrs/' + address + '/balance',
    }).then(function(response) {
        console.log(response.data.balance / 100000000);
    }).catch(err => {
        console.log(err.message)
    })
}

balance('1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD');