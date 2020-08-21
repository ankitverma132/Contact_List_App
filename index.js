const express = require('express');
const path = require('path');
const { Console } = require('console');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

//To get all functionality of express. Now, app has all
//functionality of express which is needed to run server.
const app = express();

//Creating an array to pass contacts as object
var contactList = [
        {
        name: "Ankit",
        phone: "8960758532"
    },
    {
        name : "Tony",
        phone: "8412984122"
    },
    {
        name: "John",
        phone: "4786214538"
    }
]

//Setting ejs as template/view engine.
app.set('view engine', 'ejs');
//Now setting path of the view
app.set('views', path.join(__dirname,'views'));
//To use parser as middleware
app.use(express.urlencoded());
//This middleware For accessing static file, pass folder having files
app.use(express.static('assets'));

//Middleware 1
// app.use(function(req, res, next){
//     req.myName="Ankit";   //adding a key to req object
//     //console.log("Middleware 1 called");
//     next();
// });


// //Middleware 2
// app.use(function(req, res, next){
//     console.log( 'My name from MW1', req.myName);
//     //console.log("Middleware 2 called");
//     next();
// });

//Routes
//Controller
app.get('/', function(req,res){
    //console.log(req.myName);
    //console.log(req);
    //console.log(__dirname);
   //res.send("<h1>Cool, It is running</h1>");
   //If this your last statement in controller and
   //it is returning a view or sending some response
   //to the user you need to return it.

   Contact.find({}, function(err, contacts){
       if(err){
           console.log('Error in fetching contacts');
           return;
       }
       return res.render('home', {
        title : "Contacts List",
        contact_list: contacts
     });
   })

   //Sending data from controller to view/templet engine.
//    return res.render('home', {
//        title : "Contacts List",
//        contact_list: contactList
//     });
})

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us Play"
    });
})

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone

    // })

    //contactList.push(req.body);
    //Create it in schema Contact
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
        //req.body
           
    }, function(err, newContact){
        if(err){
            console.log('Error in creating a contact');
            return;
        }
        console.log('**********', newContact);
        return res.redirect('back');
    })
    // console.log(req.body);
    // console.log(req.body.name);
    //console.log(req);

    //Coming back to same page with updated contacts
    //return res.redirect('/');  //back
});

// Using param to delete a contact
// app.get('/delete-contact/:phone', function(req,res){
//     console.log(req.params);
//     let phone = req.params.phone;
// });

//Using query to delete a contact
app.get('/delete-contact/', function(req,res){

    // Using DB
    //Get the id from query in the parameter
    let id = req.query.id;
    //Find contact in database using it & delete it using a function directly
    Contact.findByIdAndDelete(id, function(err){
        //While deleting there would not be 2nd object to database
        if(err){
            console.log("Error in deleting an object from database");
            return;
        }
        return res.redirect('back');
    });



    // // console.log(req.query);
    // // get query from url
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // //If not matched it will return -1
    // if( contactList != -1 ){
    //     contactList.splice( contactIndex, 1 );
    // }
    // return res.redirect('back');
});

//Server
//Now to run server 
app.listen(port, function(err){
    if(err){
        console.log("Error in running server: ", err );
    }
    console.log("My express server is running on port: ", port);
})