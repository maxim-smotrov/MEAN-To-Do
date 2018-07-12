const tasks = require('../app/controllers/tasks');
const tags = require('../app/controllers/tags');

module.exports = (app) => {
  app.get('/tasks', tasks.getAll);
  app.post('/tasks', tasks.create);
  app.put('/tasks/:id', tasks.update);
  app.delete('/tasks/:id', tasks.remove);

  app.get('/tags', tags.getAll);
};
