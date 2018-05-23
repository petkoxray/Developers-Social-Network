const app = require('express')();
const config = require('./config/keys');
const mongoose = require('mongoose');

// DB Config
const db = config.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
require('./config/routes')(app);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

