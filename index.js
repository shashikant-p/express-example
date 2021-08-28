const exrpess = require('express');
const mongoose = require('mongoose');
const exrpesshbs = require('express-handlebars');

mongoose.connect('mongodb://localhost:27017/rentals');

const userSchema = mongoose.Schema({
    email: String,
    firstName : String,
    lastName: String,
    password: String
});

const User = mongoose.model("user", userSchema);

const app = exrpess();
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

app.get("/index", function(req, res) {
    res.render("hello", {
        userName: "Shashi",
        items: items,
        admin: isAdmin,
        layout: 'main'
    });
});

app.get("/login", function(req, res) {
    res.render("login", {
        layout: 'main'
    });
});

app.get("/register", function(req, res) {
    res.render("register", {layout: 'basic'});
});

app.get("/registerSubmit", async function(req, res) {
    const newUser = new User({
        email: req.query.email,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        password: req.query.password,        
    });

    await newUser.save();

    res.render("login", {layout: 'basic'});
});


app.get("/loginSubmit", async function(req, res) {
    console.log(req.query.username);
    console.log(req.query.password);

    const user =  await User.findOne({
        email: req.query.username
    });
    
    console.log(user);

    if (user) {
        if (user.password === req.query.password) {
            res.render("hello", {
                layout: 'basic',
                userName: user.firstName
            });
        } else {
            res.render("login", {
                layout: 'basic',
                message: "Please enter valid login details"
            });
        }
    } else {
        res.render("login", {
            layout: 'basic',
            message: "Please enter valid login details"
        });
    }

 
});

app.listen(3002);