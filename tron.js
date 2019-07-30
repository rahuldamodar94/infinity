const TronWeb = require('tronweb');
const axios = require('axios')
const bip39 = require('bip39');
const hdkey = require('hdkey');
let { HdTronPayments } = require('@faast/tron-payments')

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: '5eb34eb94221e272656f1cd7c40d4f9aabdbf0d91277a9108f1e8077fa9480ee'
})

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
    tronWeb.trx.sendTransaction(tronWeb.address.toHex(to_address),
        parseInt(tronWeb.toSun(amount)), from_pvt_key).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.message)
    })
}

var balance = async function(address) {
    const userBalance = await tronWeb.trx.getBalance(tronWeb.address.toHex(address));
    console.log(`User's balance is: ${ userBalance/1000000 }`);
};

var getInfo = async function(address) {

    let response = await tronWeb.trx.getAccount(address);
    console.log(response)
}

// getInfo('TEb6soxCbhjjbUC6XQq2LBZv7riEFGDmZF').then(res => {
//     // console.log(res);
// }).catch(err => {
//     console.log(err);
// })


// getBandwidthAndEnergyInfo('TP82vPzqLohrMWELkHbLhwktAWnpCoP42f').then(res => {
//     // console.log(res)
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