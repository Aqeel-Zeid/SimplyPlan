/*
importing Dependencies
*/
let express = require("express");
// let encode = require('hashcode').hashCode;
let app = express();
let mongoose = require('mongoose/');

app.use(express.json());

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
  console.log(`Server running on port:${port}`);
});