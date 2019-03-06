// node imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// application imports
const trips = require('./routes/trips');
const databaseConfig = require('./config/database');

// database init
mongoose.connect(
    databaseConfig.database,
    { useNewUrlParser: true }
);
mongoose.connection.on('connected', () => {
    console.log(`Connect to database: ${databaseConfig.database}`);
});

mongoose.connection.on('error', err => {
    console.error(`Database error: ${err}`);
});

// app init
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(bodyParser.json());

// static file folder -> where the angular-src is located
app.use(express.static(path.join(__dirname, 'public')));

// app routes config
app.use('/api', trips);

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
