const express = require('express');
const mongoose = require('mongoose');
const exrpesshbs = require('express-handlebars');
const routes = require('./routes');

const app = express();

// Handlebars setup
app.engine('handlebars',exrpesshbs());
app.set('view engine', 'handlebars');
app.use("/", routes);

// Start the server and listen for requests
app.listen(3002);