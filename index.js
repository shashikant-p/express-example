const express = require('express');
const mongoose = require('mongoose');
const exrpesshbs = require('express-handlebars');

// Connect to Mongo DB
mongoose.connect('mongodb://localhost:27017/rentals');

// Define the Structure for the User collection
const userSchema = mongoose.Schema({
    email: String,
    firstName : String,
    lastName: String,
    password: String
});

// Register the collection with Mongoose
const User = mongoose.model("user", userSchema);

const app = express();

// Handlebars setup
app.engine('handlebars',exrpesshbs());
app.set('view engine', 'handlebars');

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

const isAdmin = false;

// This is the home screen
app.get("/index", function(req, res) {
    res.render("hello", {
        userName: "Shashi",
        items: items,
        admin: isAdmin,
        layout: 'main'
    });
});

// This is called to show login form
app.get("/login", function(req, res) {
    res.render("login", {
        layout: 'basic'
    });
});

// This is called to show registration page
app.get("/register", function(req, res) {
    res.render("register", {
        layout: 'basic'
    });
});

// This is called when registration form is submitted
app.get("/registerSubmit", async function(req, res) {
    const newUser = new User({
        email: req.query.email,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        password: req.query.password,        
    });

    // Insert new user document in mongo db
    await newUser.save();

    // Send the user back to login page
    res.render("login", {layout: 'basic'});
});

// This is called when login form is submitted
app.get("/loginSubmit", async function(req, res) {
    console.log(req.query.username);
    console.log(req.query.password);

    // Find documents in mongodb matching the condition
    const user =  await User.findOne({
        email: req.query.username
    });
    
    console.log(user);

    // If a document was found in the db continue
    if (user) {
        // If the password is matching continue
        if (user.password === req.query.password) {
            res.render("hello", {
                layout: 'basic',
                userName: user.firstName
            });
        } else {
            // If password is not matching, take to login page
            res.render("login", {
                layout: 'basic',
                message: "Please enter valid login details"
            });
        }
    } else {
        // If no user found for the given email id, take back to login page
        res.render("login", {
            layout: 'basic',
            message: "Please enter valid login details"
        });
    }

 
});

// Start the server and listen for requests
app.listen(3002);