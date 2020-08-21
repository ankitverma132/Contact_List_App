const mongoose = require('mongoose');
//Defining schema
const contactSchema = new mongoose.Schema({
    name : {
        type :  String,
        required: true
    },
    phone : {
        type : String,
        required : true
    }
});
//Now we need to define which collection would use this schema
const Contact = mongoose.model('Contact', contactSchema );

module.exports = Contact;