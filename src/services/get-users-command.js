'use strict';

module.exports = async (repository) => {
  try {
    const response = await repository.list();

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
