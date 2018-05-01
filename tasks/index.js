const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const helpers = require('./helpers.js');

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// return all tasks
app.get('/api/getTasks', (req, res) => {
  console.log('getTasks calledddddddddddddddd')
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
app.get('/api/add', (req, res) => {
  console.log('add called')
  helpers.addNewTask((err, data) => {
    if (err) {
      console.log('Error adding task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// finds and deletes task from db
app.get('/api/delete', (req, res) => {
  console.log('delete called')
  helpers.deleteTask((err, data) => {
    if (err) {
      console.log('Error deleting task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// finds and marks completed property true
app.get('/api/complete', (req, res) => {
  console.log('complete called')
  helpers.markTaskCompleted((err, data) => {
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

