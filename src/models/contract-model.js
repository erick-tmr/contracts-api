'use strict';

const contractModelBuilder = (attributes) => ({
  id: attributes.pk || null,
  amount: attributes.amount || 0,
  status: attributes.status || 'created',
  userId: attributes.userId || null,
  approvalState: attributes.approvalState || 'analyzing',
  userSnapshot: attributes.userSnapshot || {}
});

contractModelBuilder.Statuses = [
  'created',
  'receiving_documents',
  'to_be_approved',
  'analyzed'
];

contractModelBuilder.ApprovalStates = [
  'analyzing',
  'approved',
  'rejected'
];

module.exports = contractModelBuilder;
