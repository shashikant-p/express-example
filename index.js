const exrpess = require('express');
const exrpesshbs = require('express-handlebars');

const app = exrpess();
// Handlebars setup
app.engine('handlebars',exrpesshbs());
app.set('view engine', 'handlebars');

app.get("/index", function(req, res) {
    res.render("hello", {
        userName: "Shashi",
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