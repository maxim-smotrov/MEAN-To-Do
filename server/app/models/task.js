const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
  dateUpdated: Number,
});

mongoose.model('Task', TaskSchema);
