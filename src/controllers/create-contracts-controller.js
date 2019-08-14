'use strict'

const creteContractCommand = require('../services/create-contract-command');
const contractRepository = require('../repositories/contract-repository');

module.exports = (request) => {
  const { body, pathParams } = request;
  const contractBody = {
    amount: body.amount,
    userId: pathParams.userId
  };

  return creteContractCommand(contractBody, contractRepository);
};
