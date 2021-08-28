const exrpess = require('express');
const exrpesshbs = require('express-handlebars');

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
    res.render("login", {layout: 'basic'});
});

app.get("/loginSubmit", function(req, res) {
    console.log(req.query.username);
    console.log(req.query.password);

    res.render("hello", {
        userName: req.query.username,
        layout: 'main'
    });
});

app.listen(3002);