const repl = require('repl');
const fs = require('fs');
const Web3 = require('web3');
const etcRedemptionContractAddress = "0x1312f9ec97a2377c8e2ba6f088afdfedfe59398c"
const etcredemptionABI = JSON.parse(fs.readFileSync('./lib/EtcRedemption.abi.json', 'utf-8'));

rpcProvider = process.argv[2]
dgdAccount = process.argv[3]
etcRecipient = process.argv[4]

if (dgdAccount == undefined || etcRecipient == undefined || rpcProvider == undefined) {
  console.log("Usage console <rpc_url> <account> <redeem_to>")
  console.log("\trpc_url: RPC provider with an unlocked account")
  console.log("\taccount: DGD token holder account")
  console.log("\tredeem_to: ETC account that receives the ETC tokens")
} else {
  var web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(rpcProvider));
  var EtcRedemptionContract = web3.eth.contract(etcredemptionABI);
  var gasPrice = web3.eth.gasPrice;
  var etcredemption = EtcRedemptionContract.at(etcRedemptionContractAddress);
  var txHash = etcredemption.redeem(etcRecipient, {from: dgdAccount, gas: 300000, gasPrice: gasPrice}) 
  console.log(`Successfully sent redemption transaction with tx hash: ${txHash}`);
}
