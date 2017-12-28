const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/user_mongoose_blog', { useMongoClient: true });
mongoose.Promise = Promise;

// previous mongodb instance 'mongodb://localhost/my-blog'

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('test');
});

app.use('/api/users', require('./routes/users'));

app.use('/api/blogs', require('./routes/blogs'));


module.exports = app;