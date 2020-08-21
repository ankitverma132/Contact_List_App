//Require the library
const mongoose = require('mongoose');
//Connect to db
mongoose.connect('mongodb://localhost/contacts_list_db', {useNewUrlParser: true});

//Acquire the connection to check if it is successful
const db = mongoose.connection;
//Now checking connection
//error
db.on('error', console.error.bind(console, "Error connecting to db"));
//up and running then print the message
db.once('open', function() {
  // we're connected!
  console.log("Successfully connected to database");
});