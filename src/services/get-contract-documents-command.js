'use strict';

module.exports = async (contractId, repository) => {
  try {
    const contract = await repository.find(contractId);

    if (!contract) {
      return {
        success: false,
        validations: ['contract with contractId not found.']
      };
    }

    const response = await repository.documents(contract.id);

    return {
      success: true,
      resources: response.items,
      count: response.count
    };
  } catch (error) {
    console.log('error', error);

    throw error;
  }
};
