const tasks = require('../app/controllers/tasks');

module.exports = (app) => {
  app.get('/tasks', tasks.getAll);
  app.post('/tasks', tasks.create);
  app.put('/tasks/:id', tasks.update);
  app.delete('/tasks/:id', tasks.remove);
};
