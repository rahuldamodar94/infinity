const Web3 = require('web3');
var Tx = require('ethereumjs-tx')
//http://68.183.3.239:8545/
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/75aa7935112647bc8cc49d20beafa189');
const web3 = new Web3(provider);


var balance = async function(address) {
    web3.eth.getBalance(address, (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether')
        console.log(balance);
    })
}

var send = async function(from_address, to_address, from_pvt_key, amount) {

    const account1 = from_address // Your account address 1
    const account2 = to_address // Your account address 2

    const privateKey1 = Buffer.from(from_pvt_key, 'hex')

    web3.eth.getTransactionCount(account1, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: account2,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
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

}