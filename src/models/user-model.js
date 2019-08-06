'use strict'

const getAddress = (attributes) => {
  const addressAttributes = {
    street: '',
    zipCode: '',
    city: '',
    state: '',
    country: ''
  };

  if (!attributes.address) {
    return addressAttributes;
  }

  return {
    ...addressAttributes,
    ...attributes.address
  };
}

module.exports = (attributes) => ({
    firstName: attributes.firstName || '',
    lastName: attributes.lastName || '',
    cpf: attributes.cpf || '',
    email: attributes.email || '',
    montlyIncome: attributes.montlyIncome || 0,
    dateOfBirth: attributes.dateOfBirth || null,
    maritalStatus: attributes.maritalStatus || 'unknown',
    address: getAddress(attributes)
});
