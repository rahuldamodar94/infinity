const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({server: 'wss://s1.ripple.com:443'});
const address = 'rhKrvXY8zRvVyDLT4nfXB86HyhqQyvcr4c';

api.connect().then(() => {
  api.getBalances(address).then(balances => {
    console.log(balances[0].value);
    process.exit();
  });
});