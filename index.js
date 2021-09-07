const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
const exrpesshbs = require('express-handlebars');
const routes = require('./routes');

const app = express();

// Handlebars setup
app.engine('handlebars',exrpesshbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'test',
}));
app.use("/", routes);

// Start the server and listen for requests
app.listen(3002);