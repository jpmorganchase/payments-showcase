const config = require('../config');
const common = require('./common');
const cache = require('../loaders/cache');

const oneDay = 60 * 60 * 24 * 1000;

exports.getTransactionData = function () {
  const cachedValue = common.checkInCache(config.cache.transaction, oneDay);
  if (cachedValue) {
    return cachedValue;
  }
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/tsapi/v2/transactions?accountIds=000000011116605&startDate=2021-02-22&endDate=2021-02-27',
    method: 'GET',
    cert: config.api.cert,
    key: config.api.key,
  };
  const response = common.handleHttpsRequest(options);
  cache.loadDataToCache(config.cache.transaction, response);
  return response;
};

exports.getBalanceData = function () {
  const cachedValue = common.checkInCache(config.cache.balance, oneDay);
  if (cachedValue) {
    return cachedValue;
  }
  const postData = JSON.stringify({
    startDate: '2021-02-22',
    endDate: '2021-02-27',
    accountList: [
      {
        accountId: '000000011116605',
      },
    ],
  });
  const options = {
    hostname: 'apigatewayqaf.jpmorgan.com',
    path: '/accessapi/balance',
    method: 'POST',
    cert: config.api.cert,
    key: config.api.key,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };
  const response = common.handleHttpsRequest(options, postData);
  cache.loadDataToCache(config.cache.balance, response);
  return response;
};