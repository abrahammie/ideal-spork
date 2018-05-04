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
  helpers.getAllTasks((err, data) => {
    if (err) {
      console.log('Error getting tasks:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// adds task to db, returns all tasks
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

// deletes task from db, returns all tasks
app.delete('/api/delete', (req, res) => {
  helpers.deleteTask(req.query.id, (err, data) => {
    if (err) {
      console.log('Error deleting task:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ tasks: data }));
    }
  });
});

// marks completed property true, returns all tasks
app.post('/api/complete', (req, res) => {
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
