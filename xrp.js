const RippleAPI = require('ripple-lib').RippleAPI;
const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib')

const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
const instructions = { maxLedgerVersionOffset: 5 };

var generate = async function() {
    mnemonic = bip39.generateMnemonic()

    const seed = bip39.mnemonicToSeed(mnemonic)
    const m = bip32.fromSeedBuffer(seed)
    const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
    const key = ripple.KeyPair.from_json(keyPair.privateKey.substring(2))

    console.log('privateKey: ' + keyPair.privateKey)
    console.log('privateKeyWif: ' + key.to_pri_string()) // to_wif
    console.log('publicKey: ' + keyPair.publicKey)
    console.log('address: ' + key.to_address_string())
}


var balance = function(address) {

    api.connect().then(() => {
        api.getBalances(address).then(balances => {
            console.log(balances[0].value);
            process.exit();
        });
    });
}


var send = async function(from_address, to_address, amount, secret) {

    const payment = {
        source: {
            address: from_address,
            maxAmount: {
                value: amount,
                currency: 'XRP'
            }
        },
        destination: {
            address: to_address,
            amount: {
                value: amount,
                currency: 'XRP'
            }
        }
    };

    function quit(message) {
        console.log(message);
        process.exit(0);
    }

    function fail(message) {
        console.error(message);
        process.exit(1);
    }


    api.connect().then(() => {
        console.log('Connected...');
        return api.preparePayment(from_address, payment, instructions).then(prepared => {
            console.log('Payment transaction prepared...');
            const { signedTransaction } = api.sign(prepared.txJSON, secret);
            console.log('Payment transaction signed...');
            api.submit(signedTransaction).then(quit, fail);
        });
    }).catch(fail);

}

send('rhzWTrnitp3qcWpHds53e7LAq34hFxpUHo','rspmDusLyumrWGHUTnoXkAXGwFyQhma11X','100','snyWsaFrHhwbXhVcsodm3KxHY1eon').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err);
})


