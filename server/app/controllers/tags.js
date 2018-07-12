const mongoose = require('mongoose');

const Task = mongoose.model('Task');

const getAll = (req, res) => {
  Task.find({}, { tags: 1 })
    .then((tasks) => {
      const tags = tasks.reduce((prev, curr) => prev.concat(curr.tags || []), []).sort();
      const uniqueTags = [...new Set(tags)];

      res.json(uniqueTags);
    });
};

module.exports = {
  getAll,
};
