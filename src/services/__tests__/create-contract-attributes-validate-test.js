'use strict';

const createContractAttributesValidate = require('../create-contract-attributes-validate');

const baseContractAttributes = {
  amount: 5000000,
  userId: 'my-uuid',
  approvalState: 'analyzing'
};

describe('contract without userId', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { userId, ...contractAttributes } = baseContractAttributes;

    const validations = createContractAttributesValidate(contractAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['userId is required.'])
    );
  });
});

describe('contract with approvalState not analyzing', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      approvalState: 'rejected'
    });
    expect(validations).toEqual(
      expect.arrayContaining(['approvalState must be analyzing.'])
    );
  });
});

describe('contract with amount not integer', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      amount: 1.45
    });
    expect(validations).toEqual(
      expect.arrayContaining(['amount must be a Number, integer.'])
    );
  });
});

describe('contract with amount not number', () => {
  it('returns an error', () => {
    const validations = createContractAttributesValidate({
      ...baseContractAttributes,
      amount: 'ok'
    });
    expect(validations).toEqual(
      expect.arrayContaining(['amount must be a Number, integer.'])
    );
  });
});

describe('contract without status', () => {
  it('does not return errors', () => {
    // eslint-disable-next-line no-unused-vars
    const { status, ...contractAttributes } = baseContractAttributes;

    const validations = createContractAttributesValidate(contractAttributes);
    expect(validations).toHaveLength(0);
  });
});

describe('contract without amount', () => {
  it('does not return errors', () => {
    // eslint-disable-next-line no-unused-vars
    const { amount, ...contractAttributes } = baseContractAttributes;

    const validations = createContractAttributesValidate(contractAttributes);
    expect(validations).toHaveLength(0);
  });
});

describe('with all fields correct', () => {
  it('does not return errors', () => {
    const validations = createContractAttributesValidate(baseContractAttributes);
    expect(validations).toHaveLength(0);
  });
});
