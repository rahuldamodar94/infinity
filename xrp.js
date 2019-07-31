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

// balance('rspmDusLyumrWGHUTnoXkAXGwFyQhma11X');

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

    var response = new Promise((resolve, reject) => {

        api.connect().then(() => {
            console.log('Connected...');
            return api.preparePayment(from_address, payment, instructions);
        }).then(prepared => {
            console.log('Payment transaction prepared...');
            const keypair = { privateKey: from_pvt_key, publicKey: from_pub_key };
            const { signedTransaction } = api.sign(prepared.txJSON, keypair);
            console.log('Payment transaction signed...');
            return api.submit(signedTransaction)
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })

    let final = await response;
    return final;


}

var importPvtKey = function(secret) {

    const keypair = rippleKeyPairs.deriveKeypair(secret);
    console.log(keypair);
    const address = rippleKeyPairs.deriveAddress(keypair.publicKey);
    console.log(address);
}

// importPvtKey('snJf74FFuWfnwd8Kgu33PfU5p9NvK');

// send('rUvi75ujTGtxeVdvPM4Ugd5dErciyhdCAF', 'rspmDusLyumrWGHUTnoXkAXGwFyQhma11X', '1000', '00E44A765CBBADFD853090DBA1B6F40E6389336C2AD3A558F077C6BC97D7A13157','03117677D35742BDF355C1CF9911DDECBABBA91B93A945C087BC95066F965504CE').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })