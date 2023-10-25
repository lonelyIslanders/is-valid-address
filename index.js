const express = require('express')
const ethers = require('ethers')

const provider = new ethers.providers.JsonRpcProvider('https://binance.llamarpc.com')
const USDTABI = require('./USDT.json');
const BSC_USDT_CONTRACT = new ethers.Contract('0x55d398326f99059fF775485246999027B3197955', USDTABI).connect(provider);

const app = express()


app.get('/', async (req, res) => {
    const { address } = req.query;
    if (!address) {
        res.send('无地址');
        return;
    }
    const bnb = ethers.utils.formatEther(await provider.getBalance(address));
    const USDTbalance = ethers.utils.formatEther(await BSC_USDT_CONTRACT.balanceOf(address));

    const result = { bnb: bnb, usdt: USDTbalance }
    console.log(result)
    res.send(result)
})

app.listen(7890, () => {
    console.log('run at 7890')
})