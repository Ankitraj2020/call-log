const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name:"ankit",
        phone:"123444"
    },
    {
        name:"ankit 4",
        phone:"123444837"

    }
]

app.get('/',function(req,res){
   /* return res.render("home",{
        title:"My contacts",
        contact_list:contactList
    });*/
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in findind',err);
            return;
        }
        return res.render('home',{
            title:"My contacts",
            contact_list:contacts
        });
    });
});
app.get('/practice',function(req,res){
    return res.render("practice",{
        title:"My contacts"
    });
});
app.post('/create-contact',function(req,res){
    //return res.redirect('/practice');
   // contactList.push({
    //    name:req.body.name,
    //    phone:req.body.phone
    //});
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating');
            return;
        }
        console.log('.......',newContact);
        return res.redirect('back');
    });
    //return res.redirect("/");



});
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
   Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error while deleting');
        return;
    }
    return res.redirect('back');
   });
})


app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }else{
        console.log("yup code is running fine",port);
    }
});