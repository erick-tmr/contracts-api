'use strict';

const updateContractValidate = require('./contract-update-validate');

const updateContractStatus = (contract, attributes) => {
  const newContract = {
    ...contract,
    ...attributes
  };

  if (contract.amount === 0 && attributes.amount) {
    newContract.status = 'receiving_documents';

    return newContract;
  }

  if (contract.approvalState === 'analyzing' && attributes.approvalState) {
    newContract.status = 'analyzed';
  }

  return newContract;
};

module.exports = async (contractId, attributes, repository) => {
  const contract = await repository.find(contractId);
  if (!contract) {
    return {
      success: false,
      validations: ['contract with contractId not found.']
    };
  }

  const validations = updateContractValidate(attributes, contract);
  if (validations.length !== 0) {
    return {
      success: false,
      resource: contract,
      validations
    };
  }

  try {
    const refreshedContract = await repository.find(contractId);
    const updatedContract = updateContractStatus(refreshedContract, attributes);
    await repository.update(updatedContract);

    return {
      success: true,
      resource: updatedContract
    };
  } catch (error) {
    console.log('error', error);
      
    throw error;
  }
};
