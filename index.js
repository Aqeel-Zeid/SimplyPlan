/*
importing Dependencies
*/
let express = require("express");
let encode = require('hashcode').hashCode;
let app = express();
let mongoose = require('mongoose/');

app.use(express.json());

//MongoDB url
let url = "mongodb://localhost:27017/SimplePlanDB";

//Importing MongoDB schemas 
let userSchema = require("../SimplePlan/User");
let eventSchema = require("./Events");

//compiling schema into a model
let userModel = mongoose.model('User',userSchema,'Users');
let eventsModel = mongoose.model('Event',eventSchema,'Events');

//Sign Up Route
//Route Used To register new customers into the system
//method : POST , parameters : username , email , password 
app.post('/signUp', (req,res) => 
{
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //Hashcoding password for security before storing 
    password = encode().value(req.body.password);

    //Validating Parameters
    if (!(username) || password == 0 || !(email)) {
        return res.status(404).send('Error in JSON body');
      }

      userModel.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(err);
        }
    
        if (user) {
          console.log('Username is taken');
          res.status(404).send('Username is taken');
        }
    
        if (!user) {
          //reference to DB
          let DB = mongoose.connection;
    
          //Creating a Document
          let userDoc = new userModel({
            username: username,
            password: password,
            email: email,
          });
    
          //Saving to DB
          userDoc.save(function (err, user) {
            if (err) {
              return console.error(err);
            }
            console.log(user.username + " added to DB");
    
          });
    
          //Sending success Response
          return res.status(200).send(username + ' added to Database');
        }
      });

})

//Login Route
//Checking whether password and username match and providing either success or error
//Method GET , parameters :  username , password

app.post('/login',(req,res) => {

    let username = req.body.username;
   //Hashcoding password before checking with DB
   let password = encode().value(req.body.password);

   if (!(username) || password == 0) {
    return res.status(404).send('Error in JSON body');
    }

    userModel.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
          console.log(err);
        }
    
        //If a record is found
        if (user) {
          return res.status(200).send('Valid Login');
        }
    
        //If no record found
        if (!user) {
          console.log('Incorrect Login Details');
          res.status(404).send('Incorrect Login Details');
        }
      });
    

})

//Book Event Route
//Route that adds Event Booking Details
//Method POST
//parameters : 
//     username : String
//     email: String,
//     date : String,
//     peopleAttending : Number,
//     venueBudget : Number,
//     foodBudget : Number,
//     soundsAndLightsBudget : Number,
//     cameraAndVideoBudget : Number,

app.post('/BookEvent',(req,res) => {

    //extracting the sent paramenters from the body
    let username = req.body.username;
    let email = req.body.email;
    let date = req.body.date;
    let peopleAttending = req.body.peopleAttending;
    let venueBudget = req.body.venueBudget;
    let foodBudget = req.body.foodBudget;
    let soundsAndLightsBudget = req.body.soundsAndLightsBudget;
    let cameraAndVideoBudget = req.body.cameraAndVideoBudget;
    let estimate = req.body.estimate;

    //creating the objee
    let eventDoc = new eventsModel({
        username : username,
        email : email,
        date : date,
        peopleAttending : Number(peopleAttending),
        venueBudget : Number(venueBudget),
        foodBudget : Number(foodBudget),
        soundsAndLightsBudget : Number(soundsAndLightsBudget),
        cameraAndVideoBudget : Number(cameraAndVideoBudget),
        estimate : Number(estimate)
    })

    console.log(eventDoc)

    eventDoc.save( (err,event) => {
        if (err) {
            return console.error( "DB failed couldnt Add event\n" + err);
          }
          console.log(event + " added to DB");
  
    })

    //Sending client to login page
    return res.status(200).send(' added to Database');

})

//Get All Events route
//Gets All the Events Scheduled by users
//Method : GET , parameters : none

app.get("/getAllEvents",async (req,res) => {

    const events = await eventsModel.find({});

    
        let eventMap = {};

        events.forEach(function(event) {
          eventMap[event._id] = event;
          console.log(event)
        });
    
        res.send(eventMap);  
    
})




/**
 * Connecting to the Database
 */
function connectToDB() {
    mongoose.connect(url,
        { 
        useNewUrlParser: true ,
        "auth": {"authSource":"admin"} ,
        "user": "root",
        "pass": "rootpassword"
      }
    )
      .then(function () {
        console.log('Connected to MongoDB');
      })
      .catch(function (err) {
        console.log('Error in Connecting to MongoDB');
        return;
      });
  }

// Keep server running on port
const port = 8080;
app.listen(port, () => {

  connectToDB();
  console.log(`Server running on port:${port}`);
});