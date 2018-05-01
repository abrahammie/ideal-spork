const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017');

const db = mongoose.connection;
db.on('error', err => console.log('db connection error:', err));
db.once('open', () => console.log('db connection success'));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

module.exports.Task = Task;

