const RippleAPI = require('ripple-lib').RippleAPI;
const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const ripple = require('ripplelib')
const rippleKeyPairs = require('ripple-keypairs');

const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
const instructions = { maxLedgerVersionOffset: 5 };

var generate = function() {
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

// generate();

var balance = function(address) {

    api.connect().then(() => {
        api.getBalances(address).then(balances => {
            console.log(balances[0].value);
            process.exit();
        });
    });
}

// balance('rDCXVbNixBR9eKcao9NMfRZ4qDF2mGMrF3');

var send = async function(from_address, to_address, amount, from_pvt_key, from_pub_key) {

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
            const keypair = { privateKey: from_pvt_key, publicKey: from_pub_key };
            const { signedTransaction } = api.sign(prepared.txJSON, keypair);
            console.log('Payment transaction signed...');
            api.submit(signedTransaction).then(quit, fail);
        });
    }).catch(fail);

}

var importPvtKey = function(secret) {

    const keypair = rippleKeyPairs.deriveKeypair(secret);
    console.log(keypair);
    const address = rippleKeyPairs.deriveAddress(keypair.publicKey);
    console.log(address);
}

// importPvtKey('sEdSWEN4yZYhBp8QS2Bgotxu8uj75UE');

// send('rDCXVbNixBR9eKcao9NMfRZ4qDF2mGMrF3', 'rhzWTrnitp3qcWpHds53e7LAq34hFxpUHo', '100', 'snyWsaFrHhwbXhVcsodm3KxHY1eon').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })