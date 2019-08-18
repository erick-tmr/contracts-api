'use strict';

const documentModelBuilder = (attributes) => ({
  id: attributes.pk || null,
  type: attributes.type || null,
  publicUrl: attributes.publicUrl || '',
  contractId: attributes.contractId || ''
});

documentModelBuilder.Types = [
  'cpf',
  'cnh',
  'proof_of_income',
  'property_photo'
];

module.exports = documentModelBuilder;
