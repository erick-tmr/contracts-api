'use strict';

const contractModel = require('../contract-model');

it('defines its attributes correctly', () => {
  const attributes = {
    amount: 500000,
    userId: '54545454'
  };
  const modelAttributes = Object.keys(contractModel(attributes));
  const expectedKeys = [
    'amount',
    'status',
    'userId',
    'approvalState',
    'userSnapshot',
    'id'
  ];

  expect(modelAttributes).toEqual(expect.arrayContaining(expectedKeys));
});
