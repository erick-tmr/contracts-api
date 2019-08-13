'use strict'

const createContractAttributesValidate = require('../create-contract-attributes-validate');

const baseContractAttributes = {
  amount: 5000000,
  status: 'created',
  userId: 'my-uuid',
  approved: false
};

describe('contract without userId', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { userId, ...contractAttributes } = baseContractAttributes;

    const validations = createContractAttributesValidate(contractAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['userId is required.'])
    );
  })
})

describe('contract with status different from created', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      status: 'reviewed'
    });
    expect(validations).toEqual(
      expect.arrayContaining(['status must be created.'])
    );
  })
})

describe('contract with status not in the possible values', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      status: 'not_valid'
    });
    expect(validations).toEqual(
      expect.arrayContaining(["status must be one of 'created', 'receiving_documents', 'reviewed'."])
    );
  })
})

describe('contract with approved not false', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      approved: true
    });
    expect(validations).toEqual(
      expect.arrayContaining(['approved must be false.'])
    );
  })
})

describe('contract with amount not integer', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      amount: 1.45
    });
    expect(validations).toEqual(
      expect.arrayContaining(['amount must be a Number, integer.'])
    );
  })
})

describe('contract with amount not number', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      amount: 'ok'
    });
    expect(validations).toEqual(
      expect.arrayContaining(['amount must be a Number, integer.'])
    );
  })
})

describe('with all fields correct', () => {
  it('does not return errors', () => {
    const validations = createContractAttributesValidate(baseContractAttributes);
    expect(validations).toHaveLength(0);
  })
})
