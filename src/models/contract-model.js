'use strict';

module.exports = (attributes) => ({
  amount: attributes.amount || 0,
  status: attributes.status || 'created',
  userId: attributes.userId || null,
  approvalState: attributes.approved || 'analyzing'
});
