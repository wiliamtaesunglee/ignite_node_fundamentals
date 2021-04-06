const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

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

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) return response.status(400).json({ error: "Customer not found" });
  const { statement } = customer;
  return response.json(statement)
})

app.listen(3333);