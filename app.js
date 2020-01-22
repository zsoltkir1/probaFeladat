const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const personsRoute = require('./routes/persons');

app.use('/persons',personsRoute);

app.get('/', (req,res) => {
    res.send('starting site');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
    () => console.log('connected to DB')
);

app.listen(3000);