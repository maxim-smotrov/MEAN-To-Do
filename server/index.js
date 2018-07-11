const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const app = express();
app.use(bodyParser.json());

const Task = mongoose.model('Task', {
  description: String,
  completed: Boolean,
  dateUpdated: Number,
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4140");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/tasks', (req, res) => {
  const Task = mongoose.model('Task');
  Task.find().sort({ 'completed': 'asc', 'dateUpdated': 'desc' }).then(tasks => res.json(tasks));
});
app.post('/tasks', (req, res) => {
  const Task = mongoose.model('Task');
  const newTask = { ...req.body, dateUpdated: Date.now() };
  Task.create(newTask).then(() => res.status(201).send());
});
app.put('/tasks/:id', (req, res) => {
  const Task = mongoose.model('Task');
  const updatedTask = { ...req.body, dateUpdated: Date.now() };
  Task.updateOne({ _id: req.params.id }, req.body).then(() => res.status(200).send());
});
app.delete('/tasks/:id', (req, res) => {
  const Task = mongoose.model('Task');
  Task.deleteOne({ _id: req.params.id }).then(() => res.status(204).send());
});

const port = 4141;
const mongoUrl = 'mongodb://localhost:27017/mean-to-do';
mongoose.connect(mongoUrl)
  .then(() => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch(() => console.log(`Error connecting to mongo at ${mongoUrl}`));
