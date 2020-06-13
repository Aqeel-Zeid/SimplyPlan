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

app.get('/login',(req,res) => {

    let username = req.body.username;
   //Hashcoding password before checking with DB
   let password = encode().value(req.body.password);

   if (!(username) || password == 0) {
    return res.status(404).send('Error in JSON body');
    }

    userModel.findOne({ username: username, password: password, type: "admin" }, (err, user) => {
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