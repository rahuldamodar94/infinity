const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io/',
    privateKey: '84E628E625D0C6C4F6821035619A16B9D258639BE6AF4949D3BC1B3360A4E658'
})

async function getContract(){
  let res = await tronWeb.contract().at("TKnhh9XRHPPaZh8zrJLFQoVWDrqLRjtj4J");
  return(res);
}

// getContract().then(res => {
// 	console.log(res)
// })


async function triggercontract(){
  let contractInstance = await tronWeb.contract().at('416bb4a1e882c0cae050465d779d0817daf785d36a');
  
  let args = {
    callValue:0,
    shouldPollResponse: true
  }
  let result  = await contractInstance.getMessage().call(args);

  return result;
}

// triggercontract().then(res => {
// 	console.log(res);
// }).catch(err => {
// 	console.log(err);
// })


async function triggercontract2(){
  let contractInstance = await tronWeb.contract().at('416bb4a1e882c0cae050465d779d0817daf785d36a');
  
  let args = {
    callValue:0,
    shouldPollResponse: true
  }
  let result  = await contractInstance.postMessage('asfdasfsafsa').send(args);

  return result;
}

triggercontract2().then(res => {
	console.log(res);
}).catch(err => {
	console.log(err);
})