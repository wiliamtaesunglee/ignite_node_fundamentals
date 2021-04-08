const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  request.customer = customer;
  customer ? next() : response.status(400).json({ error: "Customer not found" })
}

app.post('/account', (request, response) => {
  const { cpf, name, statement } = request.body;
  const customerAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );
  if (customerAlreadyExist) return response.status(400).json({ error: "Customer already exists!" });
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement,
  });
  return response.status(201).send();
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer: { statement } } = request; 
  return response.json(statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  }
  customer.statement.push(statementOperation);
  return response.status(201).send();
})

app.listen(3333);