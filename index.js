const app = require('express')();
const config = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// DB Config
const db = config.mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Use Routes
require('./config/routes')(app);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

