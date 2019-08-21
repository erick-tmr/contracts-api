'use strict';

const contractUpdateValidate = require('../contract-update-validate');
const contractModelBuilder = require('../../models/contract-model');

const contract = contractModelBuilder({
  amount: 3500000,
  status: 'to_be_approved',
  approvalState: 'analyzing'
});

describe('updating amount', () => {
  describe('with amount not being a valid number', () => {
    it('returns an error', () => {
      const attributes = {
        amount: 'ok'
      };
  
      const validations = contractUpdateValidate(attributes, contract);
      expect(validations).toEqual(
        expect.arrayContaining(['amount must be a Number, integer.'])
      );
    });
  });

  describe('with contract in state analyzed', () => {
    it('returns an error', () => {
      const attributes = {
        amount: 5000
      };
      const contract = contractModelBuilder({
        amount: 3500000,
        status: 'analyzed',
        approvalState: 'analyzing'
      });
  
      const validations = contractUpdateValidate(attributes, contract);
      expect(validations).toEqual(
        expect.arrayContaining(['contract must not be analyzed to update amount'])
      );
    });
  });
});

describe('updating approvalState', () => {
  describe('with invalid approvalState', () => {
    it('returns an error', () => {
      const attributes = {
        approvalState: 'not_defined'
      };

      const validations = contractUpdateValidate(attributes, contract);
      expect(validations).toEqual(
        expect.arrayContaining([`approvalState should be one of ${contractModelBuilder.ApprovalStates}`])
      );
    });
  });

  describe('with contract on status not to_be_approved', () => {
    it('returns an error', () => {
      const attributes = {
        approvalState: 'rejected'
      };
      const contract = contractModelBuilder({
        amount: 3500000,
        status: 'analyzed',
        approvalState: 'analyzing'
      });

      const validations = contractUpdateValidate(attributes, contract);
      expect(validations).toEqual(
        expect.arrayContaining(["contract must be in 'to_be_approved' to update approvalState"])
      );
    });
  });
});
