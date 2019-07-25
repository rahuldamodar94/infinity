const Web3 = require('web3');
var Tx = require('ethereumjs-tx')
//http://68.183.3.239:8545/
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/75aa7935112647bc8cc49d20beafa189');
const web3 = new Web3(provider);

web3.eth.getBalance('0xFD91a38B6F15c3Ce9F099ec418fDe23800bB9B23', (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance);
})

const account1 = '0xFD91a38B6F15c3Ce9F099ec418fDe23800bB9B23' // Your account address 1
const account2 = '0x083bD5a4e17ABFA478F366A12CCC95966236C490' // Your account address 2

const privateKey1 = Buffer.from('AA4B3CB56EA14A57121CD287D17BCC227DCB9C2291F03B70056E1F70115B46EF', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // Sign the transaction
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // Now go check etherscan to see the transaction!
    })
})