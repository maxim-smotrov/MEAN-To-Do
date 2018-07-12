const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
require('./app/models/task');
const config = require('./config');

mongoose.Promise = bluebird;

const app = express();
config.express(app);
config.routes(app);

const { appPort, mongoUrl } = config.app;
mongoose.connect(mongoUrl)
  .then(() => app.listen(appPort, () => console.log(`Listening on ${appPort}`)))
  .catch(err => console.error(`Error connecting to mongo at ${mongoUrl}:`, err));
