const Web3 = require('web3');
var Tx = require('ethereumjs-tx')
// //http://68.183.3.239:8545/
const provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/75aa7935112647bc8cc49d20beafa189');
const web3 = new Web3(provider);

var generate = function() {

    const hdkey = require('hdkey')

    const bip39 = require('bip39')
    const ethUtil = require('ethereumjs-util')

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedHex(mnemonic)
    const root = hdkey.fromMasterSeed(seed)
    const masterPrivateKey = root.privateKey.toString('hex');
    const masterPubKey = root.publicKey.toString('hex');

    var path = "m/44'/60'/0'/0/0";
    const addrNode = root.derive(path)
    const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
    console.log((addrNode._privateKey).toString('hex'));
    const addr = ethUtil.publicToAddress(pubKey).toString('hex');
    const address = ethUtil.toChecksumAddress(addr)

    console.log(address);
}

var balance = async function(address) {
    web3.eth.getBalance(address, (err, wei) => {
        balance = web3.utils.fromWei(wei, 'ether')
        console.log(balance);
    })
}

var importPvtKey = function(pvt_key) {
    const account = web3.eth.accounts.privateKeyToAccount('0x' + pvt_key);
    return ((account.address).substring(2))
}

// importPvtKey('135b553cffa3a081909f8d80b1d58e2e9acc6ed75b45dd830446c5363c4c6e7c')

var send = async function(from_address, to_address, from_pvt_key, amount) {

    const account1 = from_address // Your account address 1
    const account2 = to_address // Your account address 2

    const privateKey1 = Buffer.from(from_pvt_key, 'hex')

    web3.eth.getTransactionCount(account1, (err, txCount) => {
        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: account2,
            value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
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

// send('0xE5c926c8d3769BB99310D8F423CF699fAC45DA75','0x352088884E95CaBe2B3d63Da232cdC53182dF7f0','5058223F2828F98D0C4BBF055C64C9AB0B93303F32E722E1C82E639BFC656995',1).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err)
// })

var isValid = function(address) {
    console.log(web3.utils.isAddress(address));
}

// isValid('0xE5c926c8d3769BB99310D8F423CF699fAC45DA75');