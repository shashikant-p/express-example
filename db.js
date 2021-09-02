const mongoose = require('mongoose');

// Connect to Mongo DB
mongoose.connect('mongodb://localhost:27017/rentals');

// Define the Structure for the User collection
const userSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    isAdmin: Boolean
});

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    charges: String
});


// Register the collection with Mongoose
const User = mongoose.model("user", userSchema);
const Product = mongoose.model("product", productSchema);

module.exports = {
    User,
    Product
}