'use strict';

const documentModel = require('../models/document-model');
const documentValidations = require('./create-document-attributes-validate');

module.exports = async (attributes, documentRepository, contractRepository) => {
  const newDocument = documentModel(attributes);
  const validations = documentValidations(attributes);
  const documentContract = await contractRepository.find(newDocument.contractId);

  if (!documentContract) {
    validations.push('contract with contractId not found.');
  }

  const contractWithWrongStatus = documentContract && documentContract.status !== 'receiving_documents';
  if (contractWithWrongStatus) {
    validations.push("contract must be in 'receiving_documents' to accept documents.");

    return {
      success: false,
      resource: newDocument,
      validations
    };
  }

  if (validations.length !== 0) {
    return {
      success: false,
      resource: newDocument,
      validations
    };
  }

  try {
    const createdDocument = await documentRepository.create(newDocument);
    const refreshedContract = await contractRepository.find(createdDocument.contractId);

    const shouldUpdateContract = refreshedContract.status === 'receiving_documents'
      && (createdDocument.type === 'cpf' || createdDocument.type === 'cnh');
    if (shouldUpdateContract) {
      refreshedContract.status = 'to_be_approved';
      await contractRepository.update(refreshedContract);
    }

    return {
      success: true,
      resource: createdDocument
    };
  } catch (error) {
    console.log('error', error);
      
    throw error;
  }
};
