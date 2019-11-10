const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./src/config');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('app started on port ' + PORT);
});
