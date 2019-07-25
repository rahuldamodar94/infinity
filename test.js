const TronWeb = require('tronweb');
const axios = require('axios')

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: 'F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1'
})

// axios({
//     method: 'post',
//     url: 'https://api.shasta.trongrid.io/wallet/getaccountnet',
//     data: {
//         address: tronWeb.address.toHex("TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV"),
//     },
// }).then(function(response) {
//     console.log(response.data);
// }).catch(err => {
//     console.log(err.message)
// })


// axios({
//     method: 'post',
//     url: 'https://api.shasta.trongrid.io/wallet/freezebalance',
//     data: {
//         owner_address: tronWeb.address.toHex("TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV"),
//         frozen_balance: parseInt(tronWeb.toSun(25)),
//         frozen_duration: 3,
//         resource: "BANDWIDTH",
//     },
// }).then(function(response) {
//     return tronWeb.trx.sign(response.data, 'F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1')
// }).then(res => {
//     // console.log(res);
//     return tronWeb.trx.sendRawTransaction(res);
// }).then(res => {
// 	console.log(res);
// }).catch(err => {
//     console.log(err.message)
// })

tronWeb.trx.getAccountResources("TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV").then(res => {
	console.log(res);
})


// tronWeb.trx.sendTransaction(tronWeb.address.toHex("TAHfJybMZuDZ1Cv7pyzad9G4AXufjMKfb2"),
//     parseInt(tronWeb.toSun(100)), "F69C12C65B027FCE8AFBC3AC67F8E111E7E6C49DA392DF4FAAEA8E2B32E0D9D1").then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err.message)
// })

// const app = async () => {
//     const userBalance = await tronWeb.trx.getBalance(tronWeb.address.toHex("TQMfW11u15HnkbsYYrMyyMDsqidGjZTSKV"));
//     console.log(`User's balance is: ${ userBalance/1000000 }`);
// };

// app();