'use strict';

const updateContractCommand = require('../services/update-contract-command');
const contractRepository = require('../repositories/contract-repository');

module.exports = (request) => {
  const { body, pathParams } = request;
  const contractId = pathParams.contractId;
  const contractBody = {
    amount: body.amount,
    approvalState: body.approvalState
  };

  return updateContractCommand(contractId, contractBody, contractRepository);
};
