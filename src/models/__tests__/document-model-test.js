'use strict';

const documentModel = require('../document-model');
it('defines its attributes correctly', () => {
  const attributes = {
    amount: 500000,
    userId: '54545454'
  };
  const modelAttributes = Object.keys(documentModel(attributes));
  const expectedKeys = [
    'id',
    'type',
    'publicUrl',
    'contractId'
  ];

  expect(modelAttributes).toEqual(expect.arrayContaining(expectedKeys));
});
