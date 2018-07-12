const bodyParser = require('body-parser');
const cors = require('../app/middleware/cors');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors);
};
