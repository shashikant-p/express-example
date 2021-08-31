const express = require('express');
const mongoose = require('mongoose');
const exrpesshbs = require('express-handlebars');
const dbModels = require('./db');
const routes = require('./routes');

const app = express();

// Handlebars setup
app.engine('handlebars',exrpesshbs());
app.set('view engine', 'handlebars');
app.use("/", routes);

const items = [{
    "name": "Item 1",
    "description" : "test descrition 1",
    "amouont" : "20.00"
}, {
    "name": "Item 2",
    "description" : "test descrition 2",
    "amouont" : "30.00"
}, {
    "name": "Item 3",
    "description" : "test descrition 3",
    "amouont" : "40.00"
}];



// Start the server and listen for requests
app.listen(3002);