let mongoose = require('mongoose/');

//Defining a Event Schema
let eventSchema = mongoose.Schema({
    username: String,
    email: String,
    date : String,
    peopleAttending : Number,
    venueBudget : Number,
    foodBudget : Number,
    soundsAndLightsBudget : Number,
    cameraAndVideoBudget : Number,
    estimate : Number
  });

  module.exports  = eventSchema