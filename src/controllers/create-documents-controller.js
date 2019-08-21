'use strict';

const createDocumentCommand = require('../services/create-document-command');
const documentRepository = require('../repositories/document-repository');
const contractRepository = require('../repositories/contract-repository');

module.exports = (request) => {
  const { body, pathParams } = request;
  const documentBody = {
    type: body.type,
    publicUrl: body.publicUrl,
    contractId: pathParams.contractId
  };

  return createDocumentCommand(documentBody, documentRepository, contractRepository);
};
