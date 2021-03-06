const express = require('express');
const dbModels = require('./db');

const router = express.Router();

// This is the home screen
router.get("/", function (req, res) {
    let loggedOut = true;
    if (req.session) {
        if (req.session.loggedIn === false) {
            loggedOut = true;
        } else {
            loggedOut = false;
        }
    }
    res.render("landing", {
        layout: 'main',
        loggedOut
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
router.get("/login", async function (req, res) {
    console.log(req.session);

    if (req.session && req.session.loggedIn) {

        const user = await dbModels.User.findOne({
            email: req.session.username
        });
    
        if (user.isAdmin) {
            res.render("adminhome", {
                layout: 'main',
                userName: user.firstName,
                loggedOut: false
            });
        } else {
            let productList = await dbModels.Product.find().lean().exec();

            res.render("userhome", {
                layout: 'main',
                userName: user.firstName,
                productList: productList,
                loggedOut: false
            });

        }
    } else {
        res.render("login", {
            layout: 'main',
            loggedOut: true
        });
    }
});

// This is called to show login form
router.get("/logout", async function (req, res) {
    console.log(req.session);

    if (req.session) {

        await req.session.destroy();
        
        // res.render("landing", {
        //     layout: 'main'
        // });

        res.redirect('/');
    }
});

// This is called to show registration page
router.get("/register", function (req, res) {
    let loggedOut = true;
    if (req.session) {
        if (req.session.loggedIn === false) {
            loggedOut = true;
        }
    }    
    res.render("register", {
        layout: 'main',
        loggedOut
    });
});

// This is called when registration form is submitted
router.post("/registerSubmit", async function (req, res) {
    const newUser = new dbModels.User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        isAdmin: false
    });

    // Insert new user document in mongo db
    const user = await newUser.save();
    console.log(user);

    // Send the user back to login page
    res.render("login", { layout: 'main', loggedOut: true });
});

// This is called when login form is submitted
router.post("/loginSubmit", async function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    // Find documents in mongodb matching the condition
    const user = await dbModels.User.findOne({
        email: req.body.username
    });

    // console.log(user);

    // If a document was found in the db continue
    if (user) {
        // If the password is matching continue
        if (user.password === req.body.password) {
            if (user.isAdmin) {
                res.render("adminhome", {
                    layout: 'main',
                    userName: user.firstName,
                    loggedOut: false
                });

                req.session.loggedIn=true;
                req.session.isAdmin=true;
                req.session.username=req.body.username;
            } else {
                let productList = await dbModels.Product.find().lean().exec();

                res.render("userhome", {
                    layout: 'main',
                    userName: user.firstName,
                    productList: productList,
                    loggedOut: false
                });

                req.session.loggedIn=true;
                req.session.isAdmin=false;
                req.session.username=req.body.username;
            }



            // If password is not matching, take to login page
            res.render("login", {
                layout: 'main',
                message: "Please enter valid login details",
                loggedOut: true
            });
        }
    } else {
        // If no user found for the given email id, take back to login page
        res.render("login", {
            layout: 'basic',
            message: "Please enter valid login details",
            loggedOut: true
        });
    }
});

router.get("/listUsers", async function (req, res) {
    let userList;
    userList = await dbModels.User.find().lean().exec();

    let loggedOut = true;
    if (req.session) {
        if (req.session.loggedIn === false) {
            loggedOut = true;
        }
    }    
    res.render("users", {
        layout: 'main',
        userList: userList,
        users: true,
        loggedOut
    });
});

router.get("/products", async function (req, res) {
    let productList = await dbModels.Product.find().lean().exec();

    let loggedOut = true;
    if (req.session.loggedOut) {
        if (req.session.loggedIn === false) {
            loggedOut = true;
        }
    }
    res.render("products", {
        layout: 'main',
        products: true,
        loggedOut,
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