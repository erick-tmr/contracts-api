'use strict';

const userModel = require('../user-model');

it('defines its attributes correctly', () => {
  const attributes = {
    firstName: 'Erick',
    lastName: 'Takeshi'
  };
  const modelAttributes = Object.keys(userModel(attributes));
  const expectedKeys = [
    'firstName',
    'lastName',
    'cpf',
    'email',
    'montlyIncome',
    'dateOfBirth',
    'maritalStatus',
    'address'
  ];

  expect(modelAttributes).toEqual(expect.arrayContaining(expectedKeys));
});

it('defines the address object with its properties correctly', () => {
  const attributes = {
    firstName: 'Erick',
    lastName: 'Takeshi',
    address: {
      street: 'Al. Santos, 2000',
      zipCode: '04554-320',
      city: 'São Paulo'
    }
  };
  const addressAttributes = Object.keys(userModel(attributes).address);
  const expectedKeys = [
    'street',
    'city',
    'state',
    'zipCode',
    'country'
  ];

  expect(addressAttributes).toEqual(expect.arrayContaining(expectedKeys));
});
