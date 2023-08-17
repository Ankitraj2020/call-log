const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');
const db = mongoose.connection;

db.on('error',console.error.bind('error connecting to database'));
db.once('open',function(){
    console.log('succesfully connected to database');
});