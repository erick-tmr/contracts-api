'use strict';

const createDocumentAttributesValidate = require('../create-document-attributes-validate');
const documentModel = require('../../models/document-model');

const baseAttributes = {
  type: 'cpf',
  publicUrl: 'mycpf.com/cpf.jpg',
  contractId: 'myid'
};

describe('document with invalid type', () => {
  it('returns an error', () => {
    const attributes = {
      ...baseAttributes,
      type: 'invalid'
    };

    const validations = createDocumentAttributesValidate(attributes);
    expect(validations).toEqual(
      expect.arrayContaining([`type should be one of ${documentModel.Types}`])
    );
  });
});

describe('with all fields correct', () => {
  it('does not return errors', () => {
    const validations = createDocumentAttributesValidate(baseAttributes);
    expect(validations).toHaveLength(0);
  });
});
