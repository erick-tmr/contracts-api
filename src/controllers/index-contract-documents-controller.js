'use strict';

const getContractDocuments = require('../services/get-contract-documents-command');
const contractRepository = require('../repositories/contract-repository');

module.exports = (request) => {
  const { pathParams } = request;
  const contractId = pathParams.contractId;

  return getContractDocuments(contractId, contractRepository);
};
