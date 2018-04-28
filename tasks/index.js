const express = require('express');
const path = require('path');
var app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, world.');
});

/*
Endpoints needed:
/tasks/getTasks -> GET -> returns all tasks in db
/tasks/addTask -> POST -> adds a task to db
/tasks/editTask -> POST -> finds and modifies task in db
/tasks/deleteTask -> DELETE -> finds and deletes task from db
*/

app.listen(PORT, () => {
  console.log('Running on port:', PORT);
});