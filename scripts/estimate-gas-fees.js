require('dotenv').config();
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3"); // alchemy web3
const Web3 = require('web3');

const data = require('../artifacts/contracts/ArtCollection.sol/ArtCollection.json');
const { getTokenIds, getAmounts } = require('./helpers.js');

const abiArray = data.abi;
const {ACCOUNT1 , contract_address , API_URL , META_PRIVATE_KEY} = process.env;
console.log("API_KEY///////////" , API_URL)
let web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
web3.eth.defaultAccount = ACCOUNT1;
web3.eth.accounts.wallet.add(`0x${META_PRIVATE_KEY}`);

async function estimateGas() {
    try {
        // const accounts = await web3.eth.getAccounts(); // use this if you connected from client sides or you have API from Metamastk
        const accounts = [ACCOUNT1]
        console.log('accounts:', accounts);
        console.log('contract_address', contract_address);
        const artCollectible = new web3.eth.Contract(
            abiArray,
            contract_address,
            {
                from: accounts[0]
            }
        );
        const ids = getTokenIds(1, 2);
        const amounts = getAmounts(2);
        console.log('Token ids => ', ids);
        console.log('Amounts => ', amounts);
        const gas = await artCollectible.methods
            .mintBatch(ids, amounts)
            .estimateGas();
        console.log('Gas required for batch minting: ', gas);
        // const estimatedGasPrice = await web3.eth.getGasPrice();
        // console.log('estimated network gas price:', estimatedGasPrice);
        const gasPrice = web3.utils.toWei('24', 'gwei');
        console.log('gas cost estimation = ' + gas * gasPrice + ' wei');
        console.log(
            'gas cost estimation = ' +
                web3.utils.fromWei((gas * gasPrice).toString(), 'ether') +
                ' ether'
        );
        const block = await web3.eth.getBlock('latest');
        console.log('block gasLimit:', block.gasLimit);
    } catch (err) {
        console.log('error occurred while estimating gas fees:', err);
    }
}

estimateGas();