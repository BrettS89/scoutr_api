const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./src/config');

// require routes
const userRoutes = require('./src/routes/user');
const huntRoutes = require('./src/routes/hunt');
const huntsRoutes = require('./src/routes/hunts');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/hunts', huntsRoutes);
app.use('/hunt', huntRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('app started on port ' + PORT);
});
