'use strict';

module.exports = async (userId, repository) => {
  try {
    const user = await repository.find(userId);

    if (!user) {
      return {
        success: false,
        validations: ['user with userId not found.']
      };
    }

    const response = await repository.contracts(user.id);

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
