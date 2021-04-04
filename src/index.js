const express = require('express');

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
  return response.send({ message: "Hello World" });
});

app.get('/courses', (request, response) => {
  const { query } = request;
  console.warn(query);
  return response.json(["course one", "course two", "course three"]);
});

app.post('/courses', (request, response) => {
  const { body } = request;
  console.warn(body);
  return response.json(["course one", "course two", "course three"]);
});

app.put('/courses/:id', (request, response) => {
  const { params } = request;
  console.warn(params);
  return response.json(["course six", "course two", "course three"]);
});

app.patch('/courses/:id', (request, response) => {
  return response.json(["course one", "course seven", "course three"]);
});

app.delete('/courses/:id', (request, response) => {
  return response.json(["course one", "course two"]);
});

app.listen(3333);