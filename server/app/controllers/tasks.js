const mongoose = require('mongoose');

const Task = mongoose.model('Task');

const getAll = (req, res) => Task.find()
  .sort({ completed: 'asc', dateUpdated: 'desc' })
  .then(tasks => res.json(tasks))
  .catch(err => res.status(500).json(err));

const create = (req, res) => {
  const newTask = { ...req.body, dateUpdated: Date.now() };
  Task.create(newTask)
    .then(task => res.status(201).json(task))
    .catch(err => res.status(500).json(err));
};

const update = (req, res) => {
  const updatedTask = { ...req.body, dateUpdated: Date.now() };
  Task.updateOne({ _id: req.params.id }, updatedTask)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).json(err));
};

const remove = (req, res) => Task.deleteOne({ _id: req.params.id })
  .then(() => res.status(204).send())
  .catch(err => res.status(500).json(err));

module.exports = {
  getAll,
  create,
  update,
  remove,
};
