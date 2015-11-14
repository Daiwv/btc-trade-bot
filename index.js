var config = require('./config')
var async = require('async');

var QuadrigaCX = require('quadrigacx');
var quadrigacx = new QuadrigaCX(
  config.quadrigacx.clientId,
  config.quadrigacx.apiKey,
  config.quadrigacx.apiSecret
);

var KrakenClient = require('kraken-api');
var kraken = new KrakenClient(
  config.kraken.apiKey,
  config.kraken.privateKey
);

// kraken.api('Assets', {
// }, function(error, data) {
//   console.log(error, data)  
// })

// kraken.api('DepositMethods', {
//   asset: 'XBT/EUR'
// }, function(error, data) {
//   console.log(error, data)  
// })


// kraken.api('DepositAddresses', {
//   asset: 'XBT',
//   method: ''
// }, function(error, data) {
//   console.log(error, data)  
// })

async.waterfall([
  function buyInCanada(waterfallCb) {
    quadrigacx.api('buy', {
      amount: config.limitOrder.amount,
      price: config.limitOrder.price
    }, waterfallCb);
  },
  function getEuropeanWalletAddresss(waterfallCb) {
    kraken.api('DepositAddresses', {
      asset: '', // ???
      method: '' // ???
    }, function(error, data) {
    })
  },
  function transferToEuropeanWallet(waterfallCb) {
    quadrigacx.api('bitcoin_withdrawal', {
      amount: '', //some amount to transfer
      address: '' //address from above
    }, waterfallCb);
  },
  function transferToEuropeanBank(waterfallCb) {
    /// ???
  }
], function(err, result) {

})

