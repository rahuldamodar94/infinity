const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const RippleAPI = require('ripple-lib').RippleAPI;

const app = express();

// For parsing the incoming json.
app.use(bodyParser.json({ limit: '10mb' }));
// To limit the data being parsed from incoming json.
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// for cross platform api call.
app.use(cors());

const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
const instructions = { maxLedgerVersionOffset: 5 };

app.listen(4500, () => {
    console.log("server is running on port 4500");
});

app.post('/xrpsend', async (req, res) => {
    try {
        var from_address = req.body.from_address;
        var to_address = req.body.to_address;
        var from_pub_key = req.body.from_pub_key;
        var from_pvt_key = req.body.from_pvt_key;
        var amount = req.body.amount;

        var response = await send(from_address, to_address, amount, from_pvt_key, from_pub_key);
        res.json({ status: 200, success: true, hash: response.tx_json.hash, error: false })
    } catch (err) {
        res.json({ status: 400, success: false, hash: response, error: true })
    }

})


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