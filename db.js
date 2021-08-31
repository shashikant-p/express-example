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

// Register the collection with Mongoose
const User = mongoose.model("user", userSchema);

module.exports = {
    User
}