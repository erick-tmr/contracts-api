# contracts-api
An API to handle contracts from home equity loans.

## Tools
This project uses [Claudia.JS](https://claudiajs.com/ "Claudia.JS's Homepage") to deploy to AWS.
Configure it and run the script `npm run deploy` to deploy or `claudia create` to deploy first time.

## URL
This project is live in https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/.

## Specifications
This is a [Restful](https://restfulapi.net/ "Restful API explanation") API, so it follows it conventions for routes.

### Endpoints

#### GET /users

```
curl -X GET \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/users
```

Response format:
```json
{
  "success": "bool",
  "resources": [
    {
      "id": "uuid",
      "firstName": "text",
      "lastName": "text",
      "cpf": "text",
      "email": "text",
      "montlyIncome": "number",
      "dateOfBirth": "timestamp",
      "maritalStatus": "text",
      "address": {
        "street": "text",
        "zipCode": "text",
        "city": "text",
        "state": "text",
        "country": "text"
      }
    }
  ],
  "count": "number"
}
```

#### POST /users

```
curl -X POST \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/users \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName": "text",
    "lastName": "text",
    "cpf": "text",
    "email": "text",
    "montlyIncome": "number",
    "dateOfBirth": "timestamp",
    "maritalStatus": "text",
    "address": {
      "street": "text",
      "zipCode": "text",
      "city": "text",
      "state": "text",
      "country": "text"
    }
  }'
```

Response format:
```json
{
  "success": "bool",
  "resources": {
    "id": "uuid",
    "firstName": "text",
    "lastName": "text",
    "cpf": "text",
    "email": "text",
    "montlyIncome": "number",
    "dateOfBirth": "timestamp",
    "maritalStatus": "text",
    "address": {
      "street": "text",
      "zipCode": "text",
      "city": "text",
      "state": "text",
      "country": "text"
    }
  }
}
```

#### POST /users/:user_id/contracts

```
curl -X POST \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/users/user_id/contracts \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "number"
  }'
```

Response format:
```json
{
  "success": "bool",
  "resource": {
    "id": "uuid",
    "amount": "number",
    "status": "text",
    "userId": "uuid",
    "approvalState": "text",
    "userSnapshot": {
      ...user
    }
  }
}
```

#### GET /users/:user_id/contracts

```
curl -X GET \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/users/user_id/contracts
```

Response format:
```json
{
  "success": "bool",
  "resources": [
    {
      "id": "uuid",
      "amount": "number",
      "status": "text",
      "userId": "uuid",
      "approvalState": "text",
      "userSnapshot": {
        ...user
      }
    }
  ],
  "count": "number"
}
```

#### PUT /contracts/:contract_id
Possible approvalStates:
- "approved"
- "rejected"


```
curl -X PUT \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/contracts/contract_id \
  -H 'Content-Type: application/json' \
  -d '{
    "amount": "number",
    "approvalState": "text"
  }'
```

Response format:
```json
{
  "success": "bool",
  "resource": {
    "id": "uuid",
    "amount": "number",
    "status": "text",
    "userId": "uuid",
    "approvalState": "text",
    "userSnapshot": {
      ...user
    }
  }
}
```

#### POST /contracts/:contract_id/documents
Possible types:
- "cpf",
- "cnh",
- "proof_of_income",
- "property_photo"

```
curl -X POST \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/contracts/contract_id/documents \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "text",
    "publicUrl": "text"
  }'
```

Response format:
```json
{
  "success": "bool",
  "resource": {
    "id": "uuid",
    "type": "text",
    "publicUrl": "text",
    "contractId": "uuid"
  }
}
```

#### GET /contracts/:contract_id/documents

```
curl -X GET \
  https://479p120d33.execute-api.sa-east-1.amazonaws.com/latest/contracts/contract_id/documents
```

Response format:
```json
{
  "success": "bool",
  "resources": [
    {
      "id": "uuid",
      "type": "text",
      "publicUrl": "text",
      "contractId": "uuid"
    }
  ],
  "count": "number"
}
```

## Tests
This project uses [Jest](https://jestjs.io/ "Jest's Homepage") as its testing tool.

To run the entire test suite, run:

```
npm run test
```

## License

Licensed under the MIT license, see the separate LICENSE file.
