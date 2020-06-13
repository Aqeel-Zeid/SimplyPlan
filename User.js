let mongoose = require('mongoose/');

//Defining a User Schema
let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
  });

  module.exports  = userSchema