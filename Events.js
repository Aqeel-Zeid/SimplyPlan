let mongoose = require('mongoose/');

//Defining a Event Schema
let userSchema = mongoose.Schema({
    userName: String,
    email: String,
    date : String,
    peopleAttending : Number,
    venueBudget : Number,
    foodBudget : Number,
    soundsAndLightsBudget : Number,
    cameraAndVideoBudget : Number,
  });

  module.exports  = userSchema