const db = require('./db.js');
const mongoose = require('mongoose');

const getAllTasks = (callback) => {
  db.Task.find()
    .then(tasksArray => callback(null, tasksArray))
    .catch(err => callback(err, null));
};

const addNewTask = (taskData, callback) => {
  const newTask = new db.Task({
    name: taskData.name,
    description: taskData.description,
    date: taskData.date,
    completed: false,
  });
  newTask.save((err, savedTask) => {
    if (err) {
      callback(err, null);
    } else {
      getAllTasks(callback);
    }
  });
};

const markTaskCompleted = (taskId, callback) => {
  db.Task.findOneAndUpdate({ _id: taskId }, {
    $set: { completed: true }
  }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      getAllTasks(callback);
    }
  });
};

const deleteTask = (taskId, callback) => {
  db.Task.deleteOne({ _id: taskId })
    .then(confirm => getAllTasks(callback))
    .catch(err => callback(err, null));
};

module.exports.getAllTasks = getAllTasks;
module.exports.addNewTask = addNewTask;
module.exports.markTaskCompleted = markTaskCompleted;
module.exports.deleteTask = deleteTask;
