const User = require("../schema/userSchema");

const getUserByEmail = (email) => User.findOne({ email });

const getUserByUsername = (userName) => User.findOne({ userName });

const getUserById = (id) => User.findById(id);

module.exports = { getUserById, getUserByEmail, getUserByUsername };
