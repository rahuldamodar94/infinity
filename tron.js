const TronWeb = require('tronweb');
const axios = require('axios')
const bip39 = require('bip39');
const hdkey = require('hdkey');
let { HdTronPayments } = require('@faast/tron-payments')
var WAValidator = require('multicoin-address-validator');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
})

var importPvtKey = function(pvt_key) {
    console.log(tronWeb.address.fromPrivateKey(pvt_key));
}

let tronAddressGenerate = async function() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/195'/0'/0/0");
    let tronPayments = new HdTronPayments({ hdKey: (addrNode.toJSON()).xpriv })
    let depositAddress = await tronPayments.getAddress(0)
    let privateKey = await tronPayments.getPrivateKey(0)
    console.log(privateKey)
    console.log(depositAddress)
    return mnemonic;
}

// tronAddressGenerate().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

let tronAddressRetrieve = async function(mnemonic) {
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/195'/0'/0/0");
    let tronPayments = new HdTronPayments({ hdKey: (addrNode.toJSON()).xpriv })
    let depositAddress = await tronPayments.getAddress(0)
    let privateKey = await tronPayments.getPrivateKey(0)
    return privateKey;
}

var freeze = async function(address, pvt_key, amount, duration, type) {

    axios({
        method: 'post',
        url: 'https://api.shasta.trongrid.io/wallet/freezebalance',
        data: {
            owner_address: tronWeb.address.toHex(address),
            frozen_balance: parseInt(tronWeb.toSun(amount)),
            frozen_duration: duration,
            resource: type,
        },
    }).then(function(response) {
        console.log(response)
        return tronWeb.trx.sign(response.data, pvt_key)
    }).then(res => {
        return tronWeb.trx.sendRawTransaction(res);
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.message)
    })
}

var unfreeze = async function(address, type, pvt_key) {

    axios({
        method: 'post',
        url: 'https://api.shasta.trongrid.io/wallet/freezebalance',
        data: {
            owner_address: tronWeb.address.toHex(address),
            resource: type,
        },
    }).then(function(response) {
        return tronWeb.trx.sign(response.data, pvt_key)
    }).then(res => {
        return tronWeb.trx.sendRawTransaction(res);
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.message)
    })
}


var getBandwidthAndEnergyInfo = async function(address) {
    tronWeb.trx.getAccountResources(address).then(res => {
        console.log(res);
    })
}

var send = async function(from_pvt_key, to_address, amount) {
    let res = await tronWeb.trx.sendTransaction(tronWeb.address.toHex(to_address),
        parseInt(tronWeb.toSun(amount)), from_pvt_key);

    return res;
}


// send('F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1', 'TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2', 100).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

var balance = async function(address) {
    const userBalance = await tronWeb.trx.getBalance(tronWeb.address.toHex(address));
    console.log(`User's balance is: ${ userBalance/1000000 }`);
};

// balance('TQot8srUUiaAaJAhAFddSwNQVM3JF1UtNU').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })

var getInfo = async function(address) {

    let response = await tronWeb.trx.getAccount(address);
    return (response)
}


// getInfo('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// getBandwidthAndEnergyInfo('TJPhJceEfR1XDs8Jkmthx22Kmq9z1cn16J').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })

// freeze('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV','F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1','200',3,'BANDWIDTH').then(res =>{
//     console.log('success');
// }).catch(err=> {
//     console.log(err.message)
// })

// tronAddressGenerate().then(res => {
//     console.log(res);
// })

// importPvtKey('F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1');

var isValid = function(address) {
    var valid = WAValidator.validate(address, 'TRX');
    if (valid) {
        return true;
    } else {
        return false;
    }
}

// console.log(isValid('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV'));

// trontronWeb.trx.getTokenByID('1000137').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })Web.trx.listSuperRepresentatives().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err);
// })

// tronWeb.trx.timeUntilNextVoteCycle().then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// tronWeb.transactionBuilder.vote({srAddress : 1}, "41928c9af0651632157ef27a2cf17ca72c575a4d21", 1).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// tronWeb.transactionBuilder.sendTrx("41928c9af0651632157ef27a2cf17ca72c575a4d21",
//     parseInt(tronWeb.toSun(100)), tronWeb.address.toHex('TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV'), 1).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })


// tronWeb.trx.getTokenByID('1000137').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

var checkStatus = async function(txhash) {
    let res = await tronWeb.trx.getTransaction(txhash);
    return (res.ret[0].contractRet === 'SUCCESS');
}

// checkStatus('af53d96cb3c68bda00e7a3b2749a327fe475b0d47c54facce237abb25a595073').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

// tronWeb.trx.getAccount("TMJ8pxNMRpQBjKaz2D5q7QEDNomjDfFKDJ").then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })