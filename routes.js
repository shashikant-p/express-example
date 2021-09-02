const express = require('express');
const dbModels = require('./db');

const router = express.Router();

// This is the home screen
router.get("/", function (req, res) {
    res.render("landing", {
        layout: 'main'
    });
});

// This is the home screen
router.get("/index", function (req, res) {
    res.render("hello", {
        userName: "Shashi",
        items: items,
        layout: 'main'
    });
});

// This is called to show login form
router.get("/login", function (req, res) {
    res.render("login", {
        layout: 'main'
    });
});

// This is called to show registration page
router.get("/register", function (req, res) {
    res.render("register", {
        layout: 'main'
    });
});

// This is called when registration form is submitted
router.get("/registerSubmit", async function (req, res) {
    const newUser = new dbModels.User({
        email: req.query.email,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        password: req.query.password,
        isAdmin: false
    });

    // Insert new user document in mongo db
    const user = await newUser.save();
    console.log(user);

    // Send the user back to login page
    res.render("login", { layout: 'basic' });
});

// This is called when login form is submitted
router.get("/loginSubmit", async function (req, res) {
    console.log(req.query.username);
    console.log(req.query.password);

    // Find documents in mongodb matching the condition
    const user = await dbModels.User.findOne({
        email: req.query.username
    });

    console.log(user);

    // If a document was found in the db continue
    if (user) {
        // If the password is matching continue
        if (user.password === req.query.password) {
            if (user.isAdmin) {
                res.render("adminhome", {
                    layout: 'main',
                    userName: user.firstName
                });
            } else {

                let productList = await dbModels.Product.find().lean().exec();


                res.render("userhome", {
                    layout: 'main',
                    userName: user.firstName,
                    productList: productList
                });
            }
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

router.get("/listUsers", async function (req, res) {
    let userList;
    userList = await dbModels.User.find().lean().exec();
    res.render("users", {
        layout: 'main',
        userList: userList,
        users: true
    });
});

router.get("/products", async function (req, res) {
    let productList = await dbModels.Product.find().lean().exec();

    res.render("products", {
        layout: 'main',
        products: true,
        productList: productList
    });
});

router.get("/orders", async function (req, res) {
    res.render("orders", {
        layout: 'main',
        orders: true
    });
});

router.get("/addProduct", async function (req, res) {
    res.render("addProduct", {
        layout: 'main',
        products: true
    });
});

router.get("/saveProduct", async function (req, res) {

    const newProduct = new dbModels.Product({
        title: req.query.title,
        description: req.query.description,
        charges: req.query.charges
    });

    // Insert new user document in mongo db
    const product = await newProduct.save();

    let productList = await dbModels.Product.find().lean().exec();

    res.render("products", {
        layout: 'main',
        products: true,
        productList: productList
    });
});


module.exports = router;