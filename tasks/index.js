const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const helpers = require('./helpers.js');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// return all tasks
app.get('/api/getTasks', (req, res) => {
  console.log('getTasks called')
  helpers.getAllTasks((err, data) => {
    if (err) {
      console.log('Error getting tasks:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// adds a task to db
app.post('/api/add', (req, res) => {
  helpers.addNewTask(req.body.newTask, (err, data) => {
    if (err) {
      console.log('Error adding task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// finds and deletes task from db
app.delete('/api/delete', (req, res) => {
  console.log('delete called', req)
  console.log('delete called', req.params)
  helpers.deleteTask(req.query.id, (err, data) => {
    if (err) {
      console.log('Error deleting task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// finds and marks completed property true
app.post('/api/complete', (req, res) => {
  console.log('complete called:', req.body)
  helpers.markTaskCompleted(req.body.id, (err, data) => {
    if (err) {
      console.log('Error editing task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log('Running on port:', PORT);
});

