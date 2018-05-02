const db = require('./db.js');
const mongoose = require('mongoose');

const getAllTasks = (callback) => {
  //callback(null, testData);
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

// const testData = [
//   {
//     id: 12345,
//     name: 'walk the dog',
//     description: 'benny',
//     date: new Date(),
//     completed: false,
//   },
//   {
//     id: 123456,
//     name: 'pick up laundry',
//     description: '123 gold st.',
//     date: new Date(1530000000000),
//     completed: false,
//   },
//   {
//     id: 123457,
//     name: 'build an app',
//     description: 'Lorem ipsum dolor sit amet, ea est malorum vituperatoribus. Eirmod democritum omittantur ne sit, dolorum vocibus interesset et mei. Nam zril tamquam delicata te. Simul ubique iudicabit ei mea. Sit an rebum aliquando. Nec electram efficiantur ei, mei esse paulo contentiones ea. In vel posse percipit efficiendi, ridens nostro omittantur his ad. Ius integre salutandi mediocritatem ea, mutat tantas eam eu.',
//     date: new Date(1510000000000),
//     completed: false,
//   },
//   {
//     id: 123458,
//     name: 'pick up groceries',
//     description: 'tomato, potato',
//     date: new Date(1520005000000),
//     completed: false,
//   },
//   {
//     id: 123459,
//     name: 'call bob',
//     description: '212-123-4567',
//     date: new Date(1525000000000),
//     completed: false,
//   },
//   {
//     id: 123450,
//     name: 'do the dishes',
//     description: 'or not',
//     date: new Date(1525000050000),
//     completed: false,
//   },
//   {
//     id: 1234511,
//     name: 'walk the dog',
//     description: 'rusty',
//     date: new Date(1526000000000),
//     completed: true,
//   }
// ];
