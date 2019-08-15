'use strict';

const getAddress = (attributes) => {
  const addressAttributes = {
    street: null,
    zipCode: null,
    city: null,
    state: null,
    country: null
  };

  if (!attributes.address) {
    return addressAttributes;
  }

  return {
    ...addressAttributes,
    ...attributes.address
  };
};

module.exports = (attributes) => ({
    id: attributes.pk || null,
    firstName: attributes.firstName || '',
    lastName: attributes.lastName || '',
    cpf: attributes.cpf || '',
    email: attributes.email || '',
    montlyIncome: attributes.montlyIncome || 0,
    dateOfBirth: attributes.dateOfBirth || null,
    maritalStatus: attributes.maritalStatus || 'unknown',
    address: getAddress(attributes)
});
